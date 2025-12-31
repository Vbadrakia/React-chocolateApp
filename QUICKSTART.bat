@echo off
REM Quick Start Script for Chocolate Paradise (Windows)

echo.
echo 🍫 Chocolate Paradise - Quick Start
echo ====================================
echo.

REM Ensure we run from the script's directory
cd /d "%~dp0"

echo Installing root, backend, and frontend dependencies...
call npm install

echo.
echo Configure your PostgreSQL database:
echo    1. Update DATABASE_URL in chocolate-backend\.env
echo    2. Run: createdb chocolate_db
echo.

echo Starting full-stack dev servers (backend:5000, frontend:3000)...
call npm run dev

echo.
echo 📋 If you stop the servers, restart with:
echo    npm run dev
echo.
echo 🎉 Happy Shopping!
echo.
pause
