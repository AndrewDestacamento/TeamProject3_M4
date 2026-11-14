$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

if (-not (Test-Path "venv\Scripts\python.exe")) {
    throw "The virtual environment is missing. Run scripts\setup_windows.ps1 first."
}

if (-not (Test-Path ".env")) {
    throw ".env is missing. Run scripts\setup_windows.ps1, then add your NRP API key."
}

if ((Get-Content ".env" -Raw) -match "your_nrp_api_key_here") {
    throw "Add your NRP API key to .env before starting BudgetWise."
}

Write-Host "Starting BudgetWise at http://127.0.0.1:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop it. Do not use --reload on Windows." -ForegroundColor DarkGray
& ".\venv\Scripts\python.exe" -m uvicorn app:app --host 127.0.0.1 --port 8000
