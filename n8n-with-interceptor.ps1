# Script para executar n8n com interceptor HTTP
Write-Host "Iniciando n8n com interceptor HTTP..." -ForegroundColor Green

# Definir variáveis de ambiente
$env:N8N_LOG_LEVEL = "debug"
$env:N8N_LOG_OUTPUT = "console"

Write-Host "Log Level: $env:N8N_LOG_LEVEL" -ForegroundColor Yellow
Write-Host "Log Output: $env:N8N_LOG_OUTPUT" -ForegroundColor Yellow

Write-Host "Iniciando n8n com interceptor..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:5678" -ForegroundColor Cyan
Write-Host "Requests HTTP serao interceptados e exibidos" -ForegroundColor Cyan

# Executar n8n com interceptor
node -r .\http-interceptor.js (Get-Command n8n).Source
