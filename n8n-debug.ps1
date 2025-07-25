# Script para executar n8n no modo debug
Write-Host "Iniciando n8n no modo debug..." -ForegroundColor Green

# Variáveis de ambiente para debug
$env:N8N_LOG_LEVEL = "debug"
$env:N8N_LOG_OUTPUT = "console"
$env:DEBUG = "n8n:*,axios:*"

Write-Host "Log Level: $env:N8N_LOG_LEVEL" -ForegroundColor Yellow
Write-Host "Log Output: $env:N8N_LOG_OUTPUT" -ForegroundColor Yellow
Write-Host "Debug: $env:DEBUG" -ForegroundColor Yellow

Write-Host "Iniciando n8n..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:5678" -ForegroundColor Cyan
Write-Host "Todos os requests HTTP serao exibidos no console" -ForegroundColor Cyan

# Executar n8n
n8n
