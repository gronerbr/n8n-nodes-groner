Write-Host "🚀 Deployando node Groner para teste local..." -ForegroundColor Green

Write-Host "📦 Fazendo build do projeto..." -ForegroundColor Yellow
npm run build

$customDir = "$env:APPDATA\n8n\custom"
if (-not (Test-Path $customDir)) {
    Write-Host "📁 Criando diretório custom..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $customDir -Force
}

Write-Host "📋 Copiando arquivos para diretório custom..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination $customDir -Recurse -Force

Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host "📍 Arquivos copiados para: $customDir" -ForegroundColor Cyan
Write-Host "🔄 Reinicie o n8n para carregar o node Groner" -ForegroundColor Cyan
