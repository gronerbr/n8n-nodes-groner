![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-groner

Este repositório contém nós customizados para integração do n8n com a API do Groner (CRM Solar). O nó Groner fornece funcionalidades abrangentes para gerenciar leads, projetos, tarefas e comunicações dentro do sistema CRM Groner.

---

## 🚀 Nó Principal

- **Groner**: Nó principal para integração com a API do Groner, cobrindo todas as principais operações de CRM incluindo gerenciamento de leads, acompanhamento de projetos, criação de tarefas e mensagens WhatsApp.

## 📋 Recursos e Operações Disponíveis

### 🔗 Recursos Disponíveis

| Recurso | Descrição |
|---------|-----------|
| **Contact** | Gerenciamento de contatos/leads |
| **Deal** | Gerenciamento de negócios/projetos |
| **Note** | Adição de notas/ocorrências |
| **Tag** | Gerenciamento de etiquetas |
| **Task** | Criação e busca de tarefas |
| **WhatsApp** | Envio de mensagens WhatsApp |

### 📊 Operações por Recurso

#### **Deal (Negócio/Projeto)**
| Operação | Descrição | Método HTTP |
|----------|-----------|-------------|
| **Create** | Cria um novo negócio (lead/projeto) no Groner | POST |
| **Search** | Busca negócios com filtros avançados e paginação | GET |
| **Edit by Property** | Edita propriedades específicas de um negócio | PUT |
| **Get Quote** | Obtém orçamentos de um negócio específico | GET |
| **Move** | Move um negócio para um estágio diferente | POST |

#### **Contact (Contato)**
| Operação | Descrição | Método HTTP |
|----------|-----------|-------------|
| **Edit** | Edita informações do contato | PUT |
| **Edit by Property** | Edita propriedades específicas do contato | PUT |

#### **Task (Tarefa)**
| Operação | Descrição | Método HTTP |
|----------|-----------|-------------|
| **Create** | Cria uma nova tarefa | POST |
| **Search** | Busca tarefas com filtros | GET |

#### **Note (Nota)**
| Operação | Descrição | Método HTTP |
|----------|-----------|-------------|
| **Add** | Adiciona uma nota/ocorrência a um negócio | POST |

#### **Tag (Etiqueta)**
| Operação | Descrição | Método HTTP |
|----------|-----------|-------------|
| **Add** | Adiciona etiquetas a um negócio | POST |

#### **WhatsApp**
| Operação | Descrição | Método HTTP |
|----------|-----------|-------------|
| **Send** | Envia mensagem WhatsApp | POST |

---

## 🔧 Pré-requisitos

Antes de instalar e usar este pacote, certifique-se de ter o seguinte instalado em sua máquina de desenvolvimento:

### Software Necessário
- **[Git](https://git-scm.com/downloads)** - Sistema de controle de versão
- **[Node.js](https://nodejs.org/)** - Versão 18.10 ou superior
- **[pnpm](https://pnpm.io/)** - Gerenciador de pacotes (Versão 9.1 ou superior)

### Instalação do n8n
Instale o n8n globalmente usando pnpm:
```bash
pnpm install n8n -g
```

### Requisitos do Sistema
- **Node.js**: >=18.10
- **pnpm**: >=9.1
- **n8n-workflow**: Versão compatível

---

## 📦 Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/gronerbr/n8n-nodes-groner.git
cd n8n-nodes-groner
```

### 2. Instale as Dependências
```bash
pnpm install
```

### 3. Compile o Projeto
```bash
pnpm build
```
Este comando irá:
- Compilar arquivos TypeScript
- Copiar ícones customizados para a pasta de distribuição
- Preparar o pacote para uso

### 4. Modo de Desenvolvimento (Opcional)
Para desenvolvimento com recompilação automática:
```bash
pnpm dev
```

---

## 🔐 Configuração de Credenciais

### Configurando Credenciais da API Groner

1. **Acesse as Credenciais do n8n**: Em sua instância n8n, navegue para Configurações → Credenciais
2. **Adicione Nova Credencial**: Clique em "Adicionar Credencial" e selecione **Groner API**
3. **Configure as Credenciais**:
   - **Tenant**: Seu subdomínio Groner (ex: `minhaempresa`)
   - **API Key**: Sua chave de autenticação da API Groner

### Detalhes das Credenciais

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
|-------|------|-------------|-----------|---------|
| **Tenant** | String | Sim | Identificador do seu subdomínio Groner | `minhaempresa` |
| **API Key** | Password | Sim | Seu token de autenticação da API Groner | `groner_api_key_123...` |

### Estrutura do Endpoint da API
O nó constrói automaticamente os endpoints da API usando seu tenant:
```
https://{tenant}.api.groner.app/api/{endpoint}
```

---

## 🎯 Como Usar o Nó Groner

### Configuração Básica do Workflow

1. **Adicione o Nó**: Arraste e solte o nó **Groner** em seu workflow n8n
2. **Selecione o Recurso**: Escolha o recurso desejado (Deal, Contact, Task, etc.)
3. **Selecione a Operação**: Escolha a operação desejada do dropdown "Operation"
4. **Configure os Parâmetros**: Preencha os campos obrigatórios e opcionais baseado na operação selecionada
5. **Execute**: Execute o workflow para processar a operação

### Formato de Saída
- **Sucesso**: Retorna dados da resposta da API como JSON
- **Operações de Busca**: Cada item retornado se torna um item individual do n8n
- **Tratamento de Erros**: Erros são exibidos no painel de execução do nó

---

## 📖 Guia Detalhado de Operações

### 1. Create Deal (Criar Negócio)

Cria um novo lead ou projeto no Groner com capacidades abrangentes de rastreamento.

#### Campos Obrigatórios
- **Name** (`nome`): Nome completo do contato
- **Email** (`email`): Endereço de email do contato
- **Phone** (`telefone`): Número de telefone do contato
- **Origin Name or ID** (`codOrigem`): Origem do lead (loadOptions)

#### Campos Opcionais
- **Account Value** (`valorConta`): Valor estimado do projeto
- **City** (`cidade`): Cidade do contato
- **Document** (`documento`): Número de CPF ou CNPJ
- **Person Type** (`tipoPessoa`): PF (Individual) ou PJ (Empresa)
- **State** (`uf`): Abreviação do estado brasileiro
- **Responsible Name or ID** (`responsavelId`): Vendedor responsável (loadOptions)
- **Responsible Email** (`emailResponsavel`): Email do vendedor
- **Note** (`nota`): Observações iniciais sobre o lead
- **Campaign** (`campanha`): Identificador da campanha de marketing
- **Advertisement** (`anuncio`): Referência da campanha publicitária
- **Ad Set** (`conjuntoAnuncios`): Identificador do grupo de anúncios
- **Lead Tracking Code** (`codigoLeadTracking`): Código de rastreamento para analytics
- **Trade Name** (`nomeFantasia`): Nome fantasia da empresa (para PJ)
- **Segment** (`segmento`): Classificação do segmento de negócio
- **Deal Type Name or ID** (`tipoProjetoId`): Tipo de projeto solar (loadOptions)
- **URL** (`url`): URL customizada do endpoint (opcional)

#### Exemplo de Uso
```json
{
  "nome": "João Silva",
  "email": "joao.silva@exemplo.com",
  "telefone": "+5511999999999",
  "codOrigem": "1",
  "cidade": "São Paulo",
  "documento": "123.456.789-00",
  "tipoPessoa": "F",
  "valorConta": 25000,
  "nota": "Interessado em instalação solar residencial"
}
```

### 2. Search Deals (Buscar Negócios)

Busca negócios existentes com filtros avançados e paginação.

#### Parâmetros de Filtro
- **Page Size** (`pageSize`): Itens por página (padrão: 20)
- **Search** (`query`): Busca textual nos dados do negócio
- **Criterio** (`criterio`): Critério de busca
- **Filters**:
  - **Deal Type ID** (`dealTypeId`): Filtrar por tipo de projeto (loadOptions)
  - **Stage ID** (`stageId`): Filtrar por estágio do pipeline de vendas (loadOptions)
  - **Status ID** (`statusId`): Filtrar por status (loadOptions)
  - **Responsible Seller ID** (`responsibleSellerId`): Filtrar por vendedor responsável (loadOptions)
  - **Responsible Technician ID** (`responsibleTechnicianId`): Filtrar por técnico responsável (loadOptions)
  - **Pre Seller ID** (`preSellerId`): Filtrar por pré-vendedor (loadOptions)
- **Additional Fields**:
  - **Lead ID** (`leadId`): Filtrar por lead específico
  - **Stores IDs** (`storesIds`): Filtrar por localizações das lojas (multiOptions)
  - **Tags IDs** (`tagsIds`): Filtrar por etiquetas específicas (multiOptions)
  - **Origins IDs** (`originsIds`): Filtrar por origens (multiOptions)
  - **Status History IDs** (`statusHistoryIds`, `nStatusHistoryIds`): Filtrar por histórico de status (multiOptions)
  - **Order By** (`orderBy`): Critério de ordenação
  - **Initial Qualification** (`initialQualification`): Qualificação inicial (0-10)
  - **Final Qualification** (`finalQualification`): Qualificação final (0-10)
  - **Indicator** (`indicator`): Indicador de performance
  - **Contact Owner ID** (`contactOwnerId`): Filtrar por proprietário do contato
  - **Campaign** (`campaign`): Filtrar por campanha
  - **Advertisement** (`advertisement`): Filtrar por anúncio
  - **Ad Set** (`adSet`): Filtrar por conjunto de anúncios
- **Location**:
  - **City** (`city`): Filtrar por cidade
  - **State** (`state`): Filtrar por estado
- **Financial**:
  - **Initial Power** (`initialPower`): Potência inicial em kW
  - **Final Power** (`finalPower`): Potência final em kW
  - **Initial Value** (`initialValue`): Valor inicial do projeto
  - **Final Value** (`finalValue`): Valor final do projeto
  - **Initial Consumption** (`initialConsumption`): Consumo inicial em kWh
  - **Final Consumption** (`finalConsumption`): Consumo final em kWh
- **Dates**:
  - **Start Date** (`startDate`): Data inicial
  - **End Date** (`endDate`): Data final
  - **Initial Closing Forecast Date** (`initialClosingForecastDate`): Data inicial de previsão de fechamento
  - **Final Closing Forecast Date** (`finalClosingForecastDate`): Data final de previsão de fechamento
  - **Initial Proposal Date** (`initialProposalDate`): Data inicial da proposta
  - **Final Proposal Date** (`finalProposalDate`): Data final da proposta
  - **Initial Sale Date** (`initialSaleDate`): Data inicial da venda
  - **Final Sale Date** (`finalSaleDate`): Data final da venda
  - **Initial Loss Date** (`initialLossDate`): Data inicial da perda
  - **Final Loss Date** (`finalLossDate`): Data final da perda

#### Exemplo de Uso
```json
{
  "pageSize": 50,
  "query": "instalação solar",
  "filters": {
    "stageId": "1",
    "statusId": "2"
  },
  "financial": {
    "initialValue": 10000,
    "finalValue": 50000
  }
}
```

### 3. Add Tags (Adicionar Etiquetas)

Adiciona etiquetas organizacionais a negócios existentes.

#### Campos Obrigatórios
- **Deal ID** (`dealId`): ID do negócio
- **Tag IDs** (`tagIds`): Array de IDs das etiquetas

#### Exemplo de Uso
```json
{
  "dealId": "12345",
  "tagIds": ["1", "2", "3"]
}
```

### 4. Add Note (Adicionar Nota)

Adiciona notas ou ocorrências para rastrear interações do negócio.

#### Campos Obrigatórios
- **Deal ID** (`dealId`): ID do negócio
- **Occurrence** (`ocorrencia`): Conteúdo da nota

#### Campos Opcionais
- **Mentions** (`marcacoes`): Menções de usuários opcionais

#### Exemplo de Uso
```json
{
  "dealId": "12345",
  "ocorrencia": "Cliente solicitou orçamento para sistema de 10kW",
  "marcacoes": "@equipe_vendas"
}
```

### 5. Create Task (Criar Tarefa)

Cria tarefas vinculadas a negócios com capacidades de atribuição.

#### Campos Obrigatórios
- **Title** (`titulo`): Título da tarefa
- **Type ID** (`tipoId`): Identificador do tipo de tarefa (loadOptions)
- **Status ID** (`statusId`): Status da tarefa (loadOptions)
- **Project ID** (`projetoId`): ID do negócio associado
- **Users IDs** (`usuariosIds`): IDs dos usuários atribuídos (multiOptions)

#### Campos Opcionais
- **Description** (`descricao`): Descrição da tarefa
- **Start Date** (`dataInicial`): Data de início da tarefa (YYYY-MM-DD)
- **Delivery Date** (`dataEntrega`): Data de entrega da tarefa (YYYY-MM-DD)

#### Exemplo de Uso
```json
{
  "titulo": "Ligação de follow-up",
  "descricao": "Ligar para o cliente para discutir proposta",
  "tipoId": "1",
  "statusId": "1",
  "projetoId": 12345,
  "usuariosIds": ["user1", "user2"],
  "dataInicial": "2024-01-15",
  "dataEntrega": "2024-01-20"
}
```

### 6. Search Tasks (Buscar Tarefas)

Busca tarefas com opções abrangentes de filtro.

#### Parâmetros de Filtro
- **Page Size** (`pageSize`): Itens por página (padrão: 20)
- **Search** (`query`): Busca textual
- **Additional Fields**:
  - **Lead ID** (`leadId`): Filtrar por lead associado
  - **Project ID** (`projetoId`): Filtrar por projeto associado
  - **Type ID** (`tipoId`): Filtrar por tipo de tarefa (loadOptions)
  - **Status ID** (`statusId`): Filtrar por status da tarefa (loadOptions)
  - **User ID** (`usuarioId`): Filtrar por usuário atribuído (loadOptions)
  - **Stores IDs** (`lojasIds`): Filtrar por localizações das lojas (multiOptions)
  - **Order By** (`ordenarPor`): Critério de ordenação
  - **Start Date** (`dataInicial`): Filtrar por data de início (YYYY-MM-DD)
  - **End Date** (`dataFinal`): Filtrar por data final (YYYY-MM-DD)
  - **Page Number** (`pageNumber`): Número da página

#### Exemplo de Uso
```json
{
  "projetoId": 12345,
  "statusId": "1",
  "pageSize": 20,
  "ordenarPor": "dataCriacao"
}
```

### 7. Edit Contact by Property (Editar Contato por Propriedade)

Atualiza propriedades específicas de contatos existentes.

#### Campos Obrigatórios
- **Contact ID** (`contactId`): ID do contato/lead (número)
- **Property** (`propriedade`): Nome da propriedade para atualizar (loadOptions)
- **Value** (`valor`): Novo valor da propriedade

#### Exemplo de Uso
```json
{
  "contactId": 12345,
  "propriedade": "email",
  "valor": "novo.email@exemplo.com"
}
```

### 8. Edit Deal by Property (Editar Negócio por Propriedade)

Atualiza propriedades específicas de negócios existentes.

#### Campos Obrigatórios
- **Deal ID** (`dealId`): ID do negócio (número)
- **Property** (`propriedade`): Nome da propriedade para atualizar (loadOptions)
- **Value** (`valor`): Novo valor da propriedade

#### Exemplo de Uso
```json
{
  "dealId": 12345,
  "propriedade": "valorConta",
  "valor": "30000"
}
```

### 9. Send WhatsApp Message (Enviar Mensagem WhatsApp)

Envia mensagens WhatsApp através do sistema integrado de mensagens do Groner.

#### Campos Obrigatórios
- **Message** (`mensagem`): Conteúdo da mensagem

#### Campos Opcionais
- **Lead ID** (`leadId`): ID do lead de destino (número)
- **Phone** (`celular`): Número de telefone direto
- **Image URL** (`urlImagem`): URL do anexo de imagem
- **Audio URL** (`urlAudio`): URL do anexo de áudio
- **Video URL** (`urlVideo`): URL do anexo de vídeo
- **Document URL** (`urlDocumento`): URL do anexo de documento
- **Send to Pre-Seller** (`preVendedor`): Se deve enviar para Pré-Vendedor (boolean)
- **Send to Seller** (`vendedor`): Se deve enviar para Vendedor (boolean)
- **Send to Technician** (`tecnico`): Se deve enviar para Técnico (boolean)
- **Send to Lead** (`lead`): Se deve enviar para Lead (boolean)

#### Exemplo de Uso
```json
{
  "leadId": 12345,
  "mensagem": "Olá! Aqui está seu orçamento de instalação solar.",
  "urlImagem": "https://exemplo.com/orcamento.pdf",
  "vendedor": true
}
```

### 10. Move Deal (Mover Negócio)

Altera o status/estágio de um negócio no pipeline de vendas.

#### Campos Obrigatórios
- **Deal ID** (`dealId`): ID do negócio
- **Status ID** (`statusId`): Identificador do novo status (loadOptions)

#### Campos Opcionais
- **Validate Status Available** (`validaStatusDisponivel`): Se deve validar se o status está disponível (boolean)

#### Exemplo de Uso
```json
{
  "dealId": "12345",
  "statusId": "2",
  "validaStatusDisponivel": true
}
```

### 11. Get Deal Quote (Obter Orçamento do Negócio)

Obtém orçamentos associados a um negócio específico.

#### Campos Obrigatórios
- **Project ID** (`projetoId`): ID do negócio/projeto

#### Exemplo de Uso
```json
{
  "projetoId": "12345"
}
```

---

## 🔄 Exemplos de Workflows

### Exemplo 1: Processar Deals com Content.List

Este exemplo mostra como usar o Content.List para processar múltiplos deals:

```
[Groner: Search Deals] → [Content.List] → [Groner: Edit Deal] → [Resultado]
```

**Configuração do Content.List:**
```
Input Data: {{ $json.data }}
Output Field Name: deal
```

**Configuração do Edit Deal:**
```
Resource: Deal
Operation: Edit by Property
Deal ID: {{ $json.deal.id }}
Property: valorConta
Value: {{ $json.deal.valorConta * 1.1 }}
```

### Exemplo 2: Workflow Completo de Follow-up

```
[Groner: Search Deals] → [IF] → [Groner: Add Note] → [Groner: Send WhatsApp]
```

**Condição IF:**
```
{{ $json.status === "Em Negociação" }}
```

---

## 🔧 Scripts de Desenvolvimento

| Script | Descrição |
|--------|-----------|
| `pnpm build` | Compila TypeScript e copia ícones |
| `pnpm dev` | Executa o compilador TypeScript em modo watch |
| `pnpm lint` | Verifica problemas de linting |
| `pnpm lintfix` | Corrige automaticamente problemas de linting |
| `pnpm format` | Formata código usando Prettier |
| `pnpm prepublishOnly` | Compila e verifica antes de publicar |

---

## 📁 Estrutura do Projeto

```
n8n-nodes-groner/
├── credentials/
│   └── GronerApi.credentials.ts    # Autenticação da API
├── nodes/
│   └── Groner/
│       ├── loadOptions/            # Opções dinâmicas
│       │   ├── getStatuses.ts      # Opções de status
│       │   ├── getOrigins.ts       # Opções de origem
│       │   ├── getResponsibles.ts  # Opções de usuários responsáveis
│       │   ├── getDealTypes.ts     # Opções de tipo de negócio
│       │   ├── getTags.ts          # Opções de etiquetas
│       │   ├── getStores.ts        # Opções de lojas
│       │   ├── getEtapas.ts        # Opções de estágios
│       │   ├── getTaskTypes.ts     # Opções de tipo de tarefa
│       │   ├── getTaskStatuses.ts  # Opções de status de tarefa
│       │   ├── getContactProperties.ts # Opções de propriedades de contato
│       │   └── getDealProperties.ts    # Opções de propriedades de negócio
│       ├── Groner.node.ts          # Arquivo principal do nó
│       └── logogroner.svg          # Ícone customizado
├── package.json                    # Configuração do projeto
├── tsconfig.json                   # Configuração TypeScript
└── gulpfile.js                     # Configuração de build
```

---

## ⚠️ Notas Importantes

### Tratamento de Resposta da API
- **Operações de Busca**: Cada item retornado pela API se torna um item individual do n8n para fácil processamento
- **Tratamento de Erros**: Erros da API são exibidos no painel de execução do nó com mensagens detalhadas
- **Autenticação**: Usa autenticação Bearer token com sua chave da API

### Load Options
O nó fornece carregamento dinâmico de opções para vários campos:
- **Statuses**: Status disponíveis de negócios
- **Origins**: Fontes de origem de leads
- **Responsibles**: Usuários/pessoas responsáveis disponíveis
- **Deal Types**: Tipos de projetos/negócios
- **Tags**: Etiquetas disponíveis
- **Stores**: Localizações de lojas
- **Etapas**: Estágios do pipeline de vendas
- **Task Types**: Tipos de tarefas
- **Task Statuses**: Opções de status de tarefas
- **Contact Properties**: Propriedades disponíveis de contatos
- **Deal Properties**: Propriedades disponíveis de negócios

### Ícone Customizado
- O nó exibe o logo do Groner se o arquivo `logogroner.svg` estiver presente no diretório do nó
- O ícone é copiado automaticamente durante o processo de build

### Validação de Dados
- Campos vazios são automaticamente removidos das requisições da API
- Campos obrigatórios são validados antes de enviar requisições
- Formatos de data devem seguir o padrão YYYY-MM-DD
- Arrays são automaticamente convertidos para strings separadas por vírgula para compatibilidade com a API

### Rate Limiting
- Esteja ciente dos limites de taxa da API do Groner
- Implemente atrasos apropriados entre requisições em workflows de alto volume

---

## 🤝 Contribuindo

Aceitamos contribuições! Aqui está como você pode ajudar:

### Reportando Problemas
- Use o rastreador de problemas do GitHub
- Forneça mensagens de erro detalhadas e passos para reproduzir
- Inclua sua versão do n8n e configuração do nó

### Enviando Pull Requests
1. Faça um fork do repositório
2. Crie um branch de feature
3. Faça suas alterações
4. Execute `pnpm lint` e `pnpm build`
5. Envie um pull request com descrição detalhada

### Diretrizes de Desenvolvimento
- Siga as melhores práticas do TypeScript
- Mantenha formatação de código consistente
- Adicione tratamento de erro apropriado
- Inclua validação de campo onde necessário

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE.md).

---

## 📞 Suporte

Para suporte e perguntas:
- **Email**: contato@gronercrm.com.br
- **GitHub Issues**: [Criar um problema](https://github.com/gronerbr/n8n-nodes-groner/issues)
- **Documentação**: Este README e comentários inline do código

---

## 🌐 Versões de Idioma

- **[Versão em Inglês](README.md)**
- **[Versão em Português](README_PT.md)** (Atual)

---

## 🔄 Histórico de Versões

- **v0.1.18**: Versão atual com operações abrangentes de CRM e estrutura de campos atualizada
- **v0.1.17**: Adicionadas capacidades de mensagens WhatsApp
- **v0.1.16**: Opções aprimoradas de busca e filtro
- **v0.1.15**: Tratamento de erro e validação melhorados
- **v0.1.14**: Lançamento inicial com operações básicas

Para changelog detalhado, veja os [releases do GitHub](https://github.com/gronerbr/n8n-nodes-groner/releases). 