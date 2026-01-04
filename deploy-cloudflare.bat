@echo off
echo ================================
echo   Cloudflare Pages Deployment
echo ================================
echo.

cd chocolate-frontend

echo [1/3] Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Checking Wrangler...
where wrangler >nul 2>&1
if %errorlevel% neq 0 (
    echo Wrangler not found. Installing...
    call npm install -g wrangler
)

echo.
echo [3/3] Deploying to Cloudflare Pages...
call wrangler pages deploy dist --project-name=react-chocolateapp

echo.
echo ================================
echo   Deployment Complete!
echo ================================
echo.
echo Visit: https://react-chocolateapp.pages.dev
echo.
pause
