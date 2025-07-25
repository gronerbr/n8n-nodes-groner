# Script para debug específico do Groner
Write-Host "Iniciando n8n com debug específico do Groner..." -ForegroundColor Green

# Parar n8n se estiver rodando
Write-Host "Parando n8n se estiver rodando..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null

# Definir variáveis para debug
$env:N8N_LOG_LEVEL = "debug"
$env:N8N_LOG_OUTPUT = "console"

Write-Host "Log Level: $env:N8N_LOG_LEVEL" -ForegroundColor Yellow
Write-Host "Log Output: $env:N8N_LOG_OUTPUT" -ForegroundColor Yellow

Write-Host "Iniciando n8n com interceptor Groner..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:5678" -ForegroundColor Cyan
Write-Host "Requests do Groner serao exibidos no console" -ForegroundColor Cyan

# Executar n8n com interceptor
node -r .\debug-status.js (Get-Command n8n).Source
