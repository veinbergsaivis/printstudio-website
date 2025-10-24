# E-pasta konfigurācijas FTP upload skripts (Windows PowerShell)
# Izmantot lokāli ar: .\upload-email-config.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$FtpServer = "ftp.printstudio.lv",
    
    [Parameter(Mandatory=$true)]
    [string]$FtpUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$FtpPassword
)

Write-Host "`n╔═══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   E-pasta konfigurācijas FTP Upload       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Funkcija FTP upload
function Upload-File {
    param(
        [string]$LocalFile,
        [string]$RemotePath
    )
    
    try {
        $ftpUri = "ftp://$FtpServer$RemotePath"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FtpUsername, $FtpPassword)
        $ftpRequest.UseBinary = $true
        $ftpRequest.UsePassive = $true
        
        $fileContent = [System.IO.File]::ReadAllBytes($LocalFile)
        $ftpRequest.ContentLength = $fileContent.Length
        
        $requestStream = $ftpRequest.GetRequestStream()
        $requestStream.Write($fileContent, 0, $fileContent.Length)
        $requestStream.Close()
        
        $response = $ftpRequest.GetResponse()
        Write-Host "✓ Augšupielādēts: $RemotePath" -ForegroundColor Green
        $response.Close()
        return $true
    }
    catch {
        Write-Host "✗ Kļūda augšupielādējot $RemotePath : $_" -ForegroundColor Red
        return $false
    }
}

# Pārbauda vai faili eksistē
$configFile = "public\contact.config.php"
$tlsFile = "public\contact.config.TLS.php"

if (-not (Test-Path $configFile)) {
    Write-Host "✗ Fails nav atrasts: $configFile" -ForegroundColor Red
    exit 1
}

# Upload contact.config.php
Write-Host "`n1. Augšupielādējam contact.config.php..." -ForegroundColor Cyan
$success1 = Upload-File -LocalFile $configFile -RemotePath "/public_html/contact.config.php"

# Upload TLS versiju (backup)
if (Test-Path $tlsFile) {
    Write-Host "`n2. Augšupielādējam contact.config.TLS.php (backup)..." -ForegroundColor Cyan
    $success2 = Upload-File -LocalFile $tlsFile -RemotePath "/public_html/contact.config.TLS.php"
}

# Kopsavilkums
Write-Host "`n╔═══════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║            AUGŠUPIELĀDE PABEIGTA!          ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "📝 Nākamie soļi:" -ForegroundColor Cyan
Write-Host "1. Instalē PHPMailer serverī:"
Write-Host "   cd /home4/printstu/repositories/printstudio-website"
Write-Host "   composer install --no-dev"
Write-Host ""
Write-Host "2. Testē: https://printstudio.lv/test-email.php"
Write-Host "3. DZĒS test-email.php pēc testēšanas!`n"

Write-Host "⚠  Ja SSL nestrādā, serverī izpildi:" -ForegroundColor Yellow
Write-Host "   mv contact.config.php contact.config.SSL.backup"
Write-Host "   mv contact.config.TLS.php contact.config.php`n"

# Lietošanas piemērs
<#
LIETOŠANA:

1. Atver PowerShell
2. Ej uz projekta mapi:
   cd "d:\PS WEB\project"

3. Palaid skriptu:
   .\scripts\upload-email-config.ps1 -FtpUsername "tavs_username" -FtpPassword "tava_parole"

4. Vai ar custom FTP serveri:
   .\scripts\upload-email-config.ps1 -FtpServer "printstudio.lv" -FtpUsername "user" -FtpPassword "pass"
#>
