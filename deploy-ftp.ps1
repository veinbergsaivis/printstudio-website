# ==========================================
# PRINTSTUDIO.LV - AUTOMATED DEPLOY SCRIPT
# ==========================================
# This script automatically uploads dist/ to cPanel via FTP
# 
# SETUP:
# 1. Install WinSCP: https://winscp.net/eng/download.php
# 2. Create FTP account in cPanel
# 3. Update credentials below
# 4. Run: .\deploy-ftp.ps1
# ==========================================

# FTP Configuration
$ftpHost = "ftp.printstudio.lv"  # Your FTP hostname
$ftpUser = "YOUR_FTP_USERNAME"   # Replace with your FTP username
$ftpPass = "YOUR_FTP_PASSWORD"   # Replace with your FTP password
$remotePath = "/public_html/"    # Remote directory on server
$localPath = ".\dist\*"          # Local directory to upload

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PRINTSTUDIO DEPLOY SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if WinSCP is installed
$winscpPath = "C:\Program Files (x86)\WinSCP\WinSCP.com"
if (-not (Test-Path $winscpPath)) {
    Write-Host "ERROR: WinSCP not found!" -ForegroundColor Red
    Write-Host "Please install WinSCP from: https://winscp.net/eng/download.php" -ForegroundColor Yellow
    Write-Host "Or update `$winscpPath in this script if installed elsewhere." -ForegroundColor Yellow
    exit 1
}

# Check if credentials are configured
if ($ftpUser -eq "YOUR_FTP_USERNAME" -or $ftpPass -eq "YOUR_FTP_PASSWORD") {
    Write-Host "ERROR: FTP credentials not configured!" -ForegroundColor Red
    Write-Host "Please edit this script and update:" -ForegroundColor Yellow
    Write-Host "  - `$ftpUser" -ForegroundColor Yellow
    Write-Host "  - `$ftpPass" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can find FTP credentials in cPanel > FTP Accounts" -ForegroundColor Cyan
    exit 1
}

# Check if dist folder exists
if (-not (Test-Path ".\dist")) {
    Write-Host "ERROR: dist/ folder not found!" -ForegroundColor Red
    Write-Host "Please run: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "Step 1: Building project..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Preparing upload..." -ForegroundColor Green
Write-Host "FTP Host: $ftpHost" -ForegroundColor Cyan
Write-Host "FTP User: $ftpUser" -ForegroundColor Cyan
Write-Host "Remote Path: $remotePath" -ForegroundColor Cyan
Write-Host "Local Path: $localPath" -ForegroundColor Cyan
Write-Host ""

# Create WinSCP script
$scriptContent = @"
option batch abort
option confirm off
open ftp://${ftpUser}:${ftpPass}@${ftpHost}
cd $remotePath
lcd dist
synchronize remote -delete
close
exit
"@

$scriptPath = ".\winscp-script.txt"
$scriptContent | Out-File -FilePath $scriptPath -Encoding ASCII

Write-Host "Step 3: Uploading to server..." -ForegroundColor Green
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

# Execute WinSCP
& $winscpPath /script=$scriptPath /log=".\deploy-log.txt"

# Clean up script file
Remove-Item $scriptPath -ErrorAction SilentlyContinue

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your website has been updated:" -ForegroundColor Cyan
    Write-Host "https://printstudio.lv" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Check deploy log: .\deploy-log.txt" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  DEPLOYMENT FAILED!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check deploy log: .\deploy-log.txt" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Wrong FTP credentials" -ForegroundColor Yellow
    Write-Host "2. FTP port blocked by firewall" -ForegroundColor Yellow
    Write-Host "3. Incorrect remote path" -ForegroundColor Yellow
    exit 1
}
