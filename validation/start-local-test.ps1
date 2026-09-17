# Chạy demo trên máy nhóm cho người thử dùng trực tiếp (validation R6, có quan sát).
# Chạy từ gốc repo:  powershell -ExecutionPolicy Bypass -File validation/start-local-test.ps1 -Tester U1
#
# - Không mở tunnel: chỉ máy này truy cập được (http://127.0.0.1).
# - Tắt /api/eval-case và giới hạn số lời gọi AI để không vượt quota free tier.
# - Mở sẵn trình duyệt ở /demo?tester=<mã>. Người tiếp theo: giữ server chạy, mở tab mới
#   http://127.0.0.1:8000/demo?tester=U2 (hoặc chạy lại script với -Tester U2 -NoServer).
# - Ctrl+C để tắt server khi xong cả buổi.

param([string]$Tester = "U1", [int]$Port = 8000, [int]$MaxCalls = 30, [switch]$NoServer)

if ($Tester -notmatch '^U\d{1,2}$') { Write-Error "Mã người thử phải dạng U1, U2…"; exit 1 }
$url = "http://127.0.0.1:$Port/demo?tester=$Tester"

if ($NoServer) {
    Start-Process $url
    Write-Host "Đã mở $url"
    exit 0
}

$env:PORT = "$Port"
$env:PUBLIC_MODE = "1"
$env:MAX_DECIDE_CALLS = "$MaxCalls"

Write-Host "Kiểm tra key và quota bằng 1 lời gọi thử (không gắn mã người thử)…"
python codebase/decision/decide.py "kiểm tra trước buổi thử" | Select-String '"route"|"error"'

$server = Start-Process python -ArgumentList "codebase/decision/server.py" -PassThru -NoNewWindow
Start-Sleep -Seconds 3
Start-Process $url
Write-Host "Server chạy (PID $($server.Id)), giới hạn $MaxCalls lời gọi AI. Đã mở $url"
Write-Host "Nhấn Ctrl+C để tắt server khi xong buổi thử."
try { Wait-Process -Id $server.Id } finally { Stop-Process -Id $server.Id -ErrorAction SilentlyContinue }
