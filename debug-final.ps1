# Comando final para debug HTTP
Write-Host "Iniciando n8n com debug HTTP..." -ForegroundColor Green

# Parar n8n se estiver rodando
Write-Host "Parando n8n se estiver rodando..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null

# Definir variáveis para debug
$env:NODE_OPTIONS = "--inspect=0.0.0.0:9229"
$env:N8N_LOG_LEVEL = "debug"
$env:N8N_LOG_OUTPUT = "console"

Write-Host "Node Options: $env:NODE_OPTIONS" -ForegroundColor Yellow
Write-Host "Log Level: $env:N8N_LOG_LEVEL" -ForegroundColor Yellow

Write-Host "Iniciando n8n..." -ForegroundColor Cyan
Write-Host "Acesse n8n: http://localhost:5678" -ForegroundColor Cyan
Write-Host "Acesse debug: http://localhost:9229" -ForegroundColor Cyan
Write-Host "No Chrome, vá para: chrome://inspect" -ForegroundColor Cyan

# Executar n8n
n8n
