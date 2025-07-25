# Script para debug especifico de requests HTTP
Write-Host "Iniciando n8n com debug de requests HTTP..." -ForegroundColor Green

# Variáveis de ambiente para debug HTTP
$env:N8N_LOG_LEVEL = "debug"
$env:N8N_LOG_OUTPUT = "console"
$env:DEBUG = "n8n:*,axios:*,http:*,https:*"
$env:NODE_DEBUG = "http,https"

Write-Host "Log Level: $env:N8N_LOG_LEVEL" -ForegroundColor Yellow
Write-Host "Debug: $env:DEBUG" -ForegroundColor Yellow
Write-Host "Node Debug: $env:NODE_DEBUG" -ForegroundColor Yellow

Write-Host "Iniciando n8n..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:5678" -ForegroundColor Cyan
Write-Host "Requests HTTP serao exibidos no console" -ForegroundColor Cyan

# Executar n8n
n8n
