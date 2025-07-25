# 🧪 Teste Local do Node Groner

## 📋 Pré-requisitos
- n8n instalado e funcionando
- Node.js 18.10+ 
- npm ou pnpm

## 🚀 Como testar o node localmente

### 1. Build e Deploy
```powershell
# Fazer build do projeto
npm run build

# Copiar para diretório custom do n8n
Copy-Item -Path "dist\*" -Destination "$env:APPDATA\n8n\custom\" -Recurse -Force
```

### 2. Executar n8n no modo debug
```powershell
# Opção 1: Usar o script
.\n8n-debug.ps1

# Opção 2: Comando direto
$env:N8N_LOG_LEVEL = "debug"
$env:N8N_LOG_OUTPUT = "console"
$env:DEBUG = "n8n:*"
n8n
```

### 3. Verificar logs
- Todos os requests HTTP serão exibidos no console
- Logs de debug mostrarão detalhes das operações
- Acesse: http://localhost:5678

### 4. Verificar se o node foi carregado
- Abra o n8n no navegador
- Vá para "Workflows" → "New Workflow"
- Procure por "Groner" na lista de nodes
- O node deve aparecer com o ícone do Groner

### 5. Configurar credenciais
1. Clique no node Groner
2. Clique em "Add Credential"
3. Selecione "Groner API"
4. Preencha:
   - **Subdomain**: Seu subdomínio do Groner (ex: comercial)
   - **API Key**: Sua chave de API do Groner (JWT token)

### 6. Testar operações
- **Deal**: Create, Edit, Search
- **Contact**: Edit, Edit by Property  
- **Task**: Create, Search
- **Note**: Add
- **Tag**: Add
- **WhatsApp**: Send

## 📁 Estrutura de arquivos
```
C:\Users\[USER]\AppData\Roaming\n8n\custom\
├── credentials\
│   └── GronerApi.credentials.js
├── nodes\
│   └── Groner\
│       ├── Groner.node.js
│       ├── Groner.node.json
│       ├── logogroner.svg
│       └── loadOptions\
└── package.json
```

## 🔄 Atualizações
Para atualizar o node após mudanças no código:
1. Execute `npm run build`
2. Execute `Copy-Item -Path "dist\*" -Destination "$env:APPDATA\n8n\custom\" -Recurse -Force`
3. Reinicie o n8n

## 🐛 Troubleshooting
- **Node não aparece**: Verifique se os arquivos foram copiados corretamente
- **Erro de credenciais**: Verifique se o subdomain e API key estão corretos
- **Erro de build**: Execute `npm run lint` para verificar erros

## 🔍 Debug e Logs

### Variáveis de ambiente para debug
```powershell
# Log detalhado de todas as operações
$env:N8N_LOG_LEVEL = "debug"

# Output no console
$env:N8N_LOG_OUTPUT = "console"

# Debug específico do n8n
$env:DEBUG = "n8n:*"

# Executar n8n
n8n
```

### O que você verá no console:
- ✅ Todos os requests HTTP (GET, POST, PUT, DELETE)
- ✅ Headers de autorização
- ✅ Payloads de dados
- ✅ Respostas da API
- ✅ Erros detalhados
- ✅ Logs de execução do workflow

### Exemplo de log de debug:
```
[2024-01-25 17:30:00] DEBUG: Making HTTP request to https://comercial.api.groner.app/api/projeto
[2024-01-25 17:30:00] DEBUG: Request headers: { Authorization: "Bearer xxx" }
[2024-01-25 17:30:01] DEBUG: Response status: 200
[2024-01-25 17:30:01] DEBUG: Response data: { ... }
```

## 📞 Suporte
Para problemas ou dúvidas, entre em contato: contato@gronercrm.com.br 
