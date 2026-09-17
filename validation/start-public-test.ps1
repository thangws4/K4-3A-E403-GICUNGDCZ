# Mở trang /demo cho người thử từ xa (validation R6, thử không đồng bộ).
# Chạy từ gốc repo:  powershell -ExecutionPolicy Bypass -File validation/start-public-test.ps1
#
# - Bật PUBLIC_MODE: tắt /api/eval-case, giới hạn số lời gọi AI (mặc định 18 để không vượt quota free tier).
# - Mở tunnel: dùng cloudflared nếu có (winget install Cloudflare.cloudflared), không thì dùng localhost.run qua ssh.
# - Link cho từng người:  <link-tunnel>/demo?tester=U1 … U5
# - TẮT (Ctrl+C) ngay khi buổi thử kết thúc. Máy phải bật và không ngủ trong suốt thời gian người thử làm bài.

param([int]$Port = 8000, [int]$MaxCalls = 18)

$env:PORT = "$Port"
$env:PUBLIC_MODE = "1"
$env:MAX_DECIDE_CALLS = "$MaxCalls"

$server = Start-Process python -ArgumentList "codebase/decision/server.py" -PassThru -NoNewWindow
Start-Sleep -Seconds 3
Write-Host "Server chạy (PID $($server.Id)), giới hạn $MaxCalls lời gọi AI."

try {
    if (Get-Command cloudflared -ErrorAction SilentlyContinue) {
        Write-Host "Mở tunnel bằng cloudflared. Tìm dòng https://....trycloudflare.com bên dưới."
        cloudflared tunnel --url "http://127.0.0.1:$Port"
    } else {
        Write-Host "Không có cloudflared, mở tunnel bằng localhost.run (ssh). Tìm dòng https://....lhr.life bên dưới."
        ssh -o StrictHostKeyChecking=accept-new -R "80:127.0.0.1:$Port" nokey@localhost.run
    }
} finally {
    Stop-Process -Id $server.Id -ErrorAction SilentlyContinue
    Write-Host "Đã tắt server."
}
