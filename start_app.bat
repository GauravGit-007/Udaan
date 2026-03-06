@echo off
echo ==========================================
echo    🚀 Udaan Super Startup Script
echo ==========================================
echo.
echo [1/2] Terminating existing processes on ports 3000 and 5000...
call npx kill-port 3000 5000
echo.
echo [2/2] Starting Frontend and Backend servers...
npm start
echo.
pause
