@echo off
echo ========================================
echo OZONE I.T SYSTEM - Deployment Script
echo ========================================

echo.
echo 1. Adding all changes to git...
git add .

echo.
echo 2. Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg="Update website with enhancements"
git commit -m "%commit_msg%"

echo.
echo 3. Pushing to GitHub...
git push origin main

echo.
echo 4. Deployment completed successfully!
echo.
echo Your website is now updated on:
echo - GitHub Repository
echo - Ready for VPS deployment
echo.
echo To deploy to VPS, run your server sync command.
echo.
pause