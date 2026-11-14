$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Setting up BudgetWise for Windows..." -ForegroundColor Cyan

if (-not (Test-Path "venv\Scripts\python.exe")) {
    if (Get-Command py -ErrorAction SilentlyContinue) {
        & py -3 -m venv venv
    }
    elseif (Get-Command python -ErrorAction SilentlyContinue) {
        & python -m venv venv
    }
    else {
        throw "Python 3.11 or newer was not found. Install Python, then run this script again."
    }
    if ($LASTEXITCODE -ne 0) {
        throw "Python could not create the virtual environment."
    }
}

& ".\venv\Scripts\python.exe" -m pip install --upgrade pip
if ($LASTEXITCODE -ne 0) {
    throw "pip could not be upgraded."
}
& ".\venv\Scripts\python.exe" -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    throw "The Python dependencies could not be installed."
}

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from .env.example." -ForegroundColor Yellow
    Write-Host "Open .env and replace your_nrp_api_key_here with your NRP API key." -ForegroundColor Yellow
}
else {
    Write-Host ".env already exists; it was left unchanged." -ForegroundColor Green
}

Write-Host "Setup complete. After adding your key to .env, run:" -ForegroundColor Green
Write-Host "  powershell -ExecutionPolicy Bypass -File .\scripts\start_windows.ps1"
