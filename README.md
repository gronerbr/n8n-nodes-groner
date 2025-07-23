![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-groner

This repository contains custom nodes for integrating n8n with the Groner API (Solar CRM). The Groner node provides comprehensive functionality to manage leads, projects, tasks, and communications within the Groner CRM system.

---

## 🚀 Main Node

- **Groner**: Primary node for integration with the Groner API, covering all major CRM operations including lead management, project tracking, task creation, and WhatsApp messaging.

## 📋 Available Operations

| Operation | Description | HTTP Method | Endpoint |
|-----------|-------------|-------------|----------|
| **Create Deal** | Creates a new deal (lead/project) in Groner with comprehensive lead tracking capabilities. | POST | `/api/lead/FluentForm/{codOrigem}` |
| **Search Deals** | Searches for deals (projects) with advanced filters and pagination support. | GET | `/api/projeto/cards` |
| **Add Tags** | Adds labels (tags) to an existing deal for better organization and categorization. | POST | `/api/projeto/AlterarEtiquetas/{id}` |
| **Add Note** | Adds a note/occurrence to a deal for tracking interactions and updates. | POST | `/api/negocio/{id}/ocorrencia` |
| **Add Task** | Creates a new task linked to a deal with assignment and scheduling capabilities. | POST | `/api/tarefa` |
| **Edit Contact By Property** | Edits specific properties of an existing contact (lead) for data updates. | PUT | `/api/lead/{id}` |
| **Edit Deal By Property** | Edits specific properties of an existing deal (project) for status updates. | PUT | `/api/projeto/{id}` |
| **Send WhatsApp Message** | Sends WhatsApp messages to leads/contacts through Groner's integrated messaging system. | POST | `/api/WhatsApp/enviarMensagem` |
| **Move Deal** | Changes the status/stage of a deal in the sales pipeline. | PUT | `/api/negocio/{id}/status` |
| **Get Deal Quote** | Retrieves quotes linked to a specific deal/project. | GET | `/api/orcamento/negocio/{projetoId}` |
| **Search Tasks** | Searches for tasks with advanced filtering options and pagination. | GET | `/api/tarefa` |

---

## 🔧 Prerequisites

Before installing and using this package, ensure you have the following installed on your development machine:

### Required Software
- **[Git](https://git-scm.com/downloads)** - Version control system
- **[Node.js](https://nodejs.org/)** - Version 18.10 or higher
- **[pnpm](https://pnpm.io/)** - Package manager (Version 9.1 or higher)

### n8n Installation
Install n8n globally using pnpm:
```bash
pnpm install n8n -g
```

### System Requirements
- **Node.js**: >=18.10
- **pnpm**: >=9.1
- **n8n-workflow**: Compatible version

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/gronerbr/n8n-nodes-groner.git
cd n8n-nodes-groner
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Build the Project
```bash
pnpm build
```
This command will:
- Compile TypeScript files
- Copy custom icons to the distribution folder
- Prepare the package for use

### 4. Development Mode (Optional)
For development with automatic recompilation:
```bash
pnpm dev
```

---

## 🔐 Credentials Configuration

### Setting Up Groner API Credentials

1. **Access n8n Credentials**: In your n8n instance, navigate to Settings → Credentials
2. **Add New Credential**: Click "Add Credential" and select **Groner API**
3. **Configure Credentials**:
   - **Tenant**: Your Groner subdomain (e.g., `mycompany`)
   - **API Key**: Your Groner API authentication key

### Credential Details

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **Tenant** | String | Yes | Your Groner subdomain identifier | `mycompany` |
| **API Key** | Password | Yes | Your Groner API authentication token | `groner_api_key_123...` |

### API Endpoint Structure
The node automatically constructs API endpoints using your tenant:
```
https://{tenant}.api.groner.app/api/{endpoint}
```

---

## 🎯 How to Use the Groner Node

### Basic Workflow Setup

1. **Add the Node**: Drag and drop the **Groner** node into your n8n workflow
2. **Select Operation**: Choose the desired operation from the "Operation" dropdown
3. **Configure Parameters**: Fill in required and optional fields based on the selected operation
4. **Execute**: Run the workflow to process the operation

### Output Format
- **Success**: Returns API response data as JSON
- **Search Operations**: Each returned item becomes an individual n8n item
- **Error Handling**: Errors are displayed in the node execution panel

---

## 📖 Detailed Operation Guide

### 1. Create Deal (Lead/Project)

Creates a new lead or project in Groner with comprehensive tracking capabilities.

#### Required Fields
- **Name** (`nome`): Full name of the contact
- **Email** (`email`): Contact email address
- **Phone** (`telefone`): Contact phone number

#### Optional Fields
- **City** (`cidade`): Contact's city
- **Document** (`documento`): CPF or CNPJ number
- **Person Type** (`tipoPessoa`): PF (Individual) or PJ (Company)
- **State** (`uf`): Brazilian state abbreviation
- **Account Value** (`valorConta`): Estimated project value
- **Responsible Name or ID** (`responsavelId`): Assigned salesperson (loadOptions)
- **Responsible Email** (`emailResponsavel`): Salesperson email
- **Note** (`nota`): Initial notes about the lead
- **Campaign** (`campanha`): Marketing campaign identifier
- **Advertisement** (`anuncio`): Ad campaign reference
- **Ad Set** (`conjuntoAnuncios`): Ad group identifier
- **Lead Tracking Code** (`codigoLeadTracking`): Tracking code for analytics
- **Trade Name** (`nomeFantasia`): Company trade name (for PJ)
- **Segment** (`segmento`): Business segment classification
- **Deal Type Name or ID** (`tipoProjetoId`): Type of solar project (loadOptions)
- **Origin Name or ID** (`codOrigem`): Lead source identifier (loadOptions)
- **Custom URL** (`url`): Custom endpoint URL (optional)

#### Example Usage
```json
{
  "nome": "John Doe",
  "email": "john.doe@example.com",
  "telefone": "+5511999999999",
  "cidade": "São Paulo",
  "documento": "123.456.789-00",
  "tipoPessoa": "PF",
  "valorConta": "25000",
  "nota": "Interested in residential solar installation"
}
```

### 2. Search Deals

Searches for existing deals with advanced filtering and pagination.

#### Filter Parameters
- **Quantity of Items** (`pageSize`): Items per page (default: 20)
- **Search** (`query`): Text search across deal data
- **Criterio** (`criterio`): Search criteria
- **Deal Type Name or ID** (`tipoProjetoId`): Filter by project type (loadOptions)
- **Etapa Name or ID** (`etapaId`): Filter by sales pipeline stage (loadOptions)
- **Status Name or ID** (`statusId`): Filter by status (loadOptions)
- **Responsible Seller Name or ID** (`vendedorResponsavelId`): Filter by assigned seller (loadOptions)
- **Responsible Technician Name or ID** (`tecnicoResponsavelId`): Filter by assigned technician (loadOptions)
- **Pre Vendedor Name or ID** (`preVendedorId`): Filter by pre-seller (loadOptions)
- **Lead ID** (`leadId`): Filter by specific lead
- **Store Names or IDs** (`lojasIds`): Filter by store locations (multiOptions)
- **City** (`cidade`): Filter by city
- **UF** (`uf`): Filter by state
- **Power Range** (`potenciaInicial`, `potenciaFinal`): Filter by power range in kW
- **Value Range** (`valorInicial`, `valorFinal`): Filter by project value range
- **Consumption Range** (`consumoInicial`, `consumoFinal`): Filter by consumption range in kWh
- **Tag Names or IDs** (`etiquetasIds`): Filter by specific tags (multiOptions)
- **Origin Names or IDs** (`origensIds`): Filter by origins (multiOptions)
- **Status History IDs** (`statusHistoricoIds`, `nStatusHistoricoIds`): Filter by status history (multiOptions)
- **Date Filters**: Multiple date range filters for different events
- **Sort By** (`ordenarPor`): Sort criteria
- **Qualification Range** (`qualificacaoInicial`, `qualificacaoFinal`): Filter by qualification (0-10)
- **Indicator** (`indicador`): Performance indicator
- **Contact Owner ID** (`donoContatoId`): Filter by contact owner
- **Marketing Fields** (`campanha`, `anuncio`, `conjuntoAnuncios`): Filter by marketing data

#### Example Usage
```json
{
  "pageSize": 50,
  "query": "solar installation",
  "etapaId": "1",
  "statusId": "2",
  "valorInicial": 10000,
  "valorFinal": 50000
}
```

### 3. Add Tags

Adds organizational labels to existing deals.

#### Required Fields
- **Deal ID** (`id`): Deal ID
- **Tag Names or IDs** (`etiquetas`): Array of tag names (multiOptions)

#### Example Usage
```json
{
  "id": "12345",
  "etiquetas": ["VIP", "Solar", "High Priority"]
}
```

### 4. Add Note

Adds notes or occurrences to track deal interactions.

#### Required Fields
- **Deal ID** (`id`): Deal ID
- **Occurrence** (`ocorrencia`): Note content

#### Optional Fields
- **Mentions** (`marcacoes`): Optional user mentions

#### Example Usage
```json
{
  "id": "12345",
  "ocorrencia": "Customer requested quote for 10kW system",
  "marcacoes": "@sales_team"
}
```

### 5. Add Task

Creates tasks linked to deals with assignment capabilities.

#### Required Fields
- **Title** (`titulo`): Task title
- **Type Name or ID** (`tipoId`): Task type identifier (loadOptions)
- **Status Name or ID** (`statusTarefaId`): Task status (loadOptions)
- **Deal ID** (`projetoId`): Associated deal ID
- **User Names or IDs** (`usuariosIds`): Assigned user IDs (multiOptions)

#### Optional Fields
- **Description** (`descricao`): Task description
- **Start Date** (`dataInicial`): Task start date (YYYY-MM-DD)
- **Delivery Date** (`dataEntrega`): Task delivery date (YYYY-MM-DD)

#### Example Usage
```json
{
  "titulo": "Follow up call",
  "descricao": "Call customer to discuss proposal",
  "tipoId": "1",
  "statusTarefaId": "1",
  "projetoId": 12345,
  "usuariosIds": ["user1", "user2"],
  "dataInicial": "2024-01-15",
  "dataEntrega": "2024-01-20"
}
```

### 6. Edit Contact By Property

Updates specific properties of existing contacts.

#### Required Fields
- **Deal ID** (`id`): Contact/Lead ID (number)
- **Property Name or ID** (`propriedade`): Property name to update (loadOptions)
- **Value** (`valor`): New property value

#### Example Usage
```json
{
  "id": 12345,
  "propriedade": "email",
  "valor": "new.email@example.com"
}
```

### 7. Edit Deal By Property

Updates specific properties of existing deals.

#### Required Fields
- **Deal ID** (`id`): Deal ID (number)
- **Property Name or ID** (`propriedade`): Property name to update (loadOptions)
- **Value** (`valor`): New property value

#### Example Usage
```json
{
  "id": 12345,
  "propriedade": "valorConta",
  "valor": "30000"
}
```

### 8. Send WhatsApp Message

Sends WhatsApp messages through Groner's integrated messaging system.

#### Required Fields
- **Message** (`mensagem`): Message content

#### Optional Fields
- **Contact ID** (`leadId`): Target lead ID (number)
- **Phone** (`celular`): Direct phone number
- **Image URL** (`urlImagem`): Image attachment URL
- **Audio URL** (`urlAudio`): Audio attachment URL
- **Video URL** (`urlVideo`): Video attachment URL
- **Document URL** (`urlDocumento`): Document attachment URL
- **Send to Pre-Seller** (`preVendedor`): Whether to send to Pre-Seller (boolean)
- **Send to Seller** (`vendedor`): Whether to send to Seller (boolean)
- **Send to Technician** (`tecnico`): Whether to send to Technician (boolean)
- **Send to Lead** (`lead`): Whether to send to Lead (boolean)

#### Example Usage
```json
{
  "leadId": 12345,
  "mensagem": "Hello! Here's your solar installation quote.",
  "urlImagem": "https://example.com/quote.pdf",
  "vendedor": true
}
```

### 9. Move Deal

Changes the status/stage of a deal in the sales pipeline.

#### Required Fields
- **Deal ID** (`id`): Deal ID
- **Status Name or ID** (`statusId`): New status identifier (loadOptions)

#### Optional Fields
- **Validate Status Availables** (`validateStatusAvailable`): Whether to validate if the status is available (boolean)

#### Example Usage
```json
{
  "id": "12345",
  "statusId": "2",
  "validateStatusAvailable": true
}
```

### 10. Get Deal Quote

Retrieves quotes associated with a specific deal.

#### Required Fields
- **Project ID** (`projetoId`): Deal/Project ID

#### Example Usage
```json
{
  "projetoId": "12345"
}
```

### 11. Search Tasks

Searches for tasks with comprehensive filtering options.

#### Filter Parameters
- **Quantity of Items** (`pageSize`): Items per page (default: 20)
- **Search** (`query`): Text search
- **Type Name or ID** (`tipoId`): Filter by task type (loadOptions)
- **Status Name or ID** (`statusId`): Filter by task status (loadOptions)
- **User Name or ID** (`usuarioId`): Filter by assigned user (loadOptions)
- **Lead ID** (`leadId`): Filter by associated lead
- **Project ID** (`projetoId`): Filter by associated project
- **Store Names or IDs** (`lojasIds`): Filter by store locations (multiOptions)
- **Start Date** (`dataInicial`): Filter by start date (YYYY-MM-DD)
- **End Date** (`dataFinal`): Filter by end date (YYYY-MM-DD)
- **Sort By** (`ordenarPor`): Sort criteria

#### Example Usage
```json
{
  "projetoId": 12345,
  "statusId": "1",
  "pageSize": 20,
  "ordenarPor": "dataCriacao"
}
```

---

## 🔧 Development Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Compiles TypeScript and copies icons |
| `pnpm dev` | Runs TypeScript compiler in watch mode |
| `pnpm lint` | Checks for linting issues |
| `pnpm lintfix` | Automatically fixes linting issues |
| `pnpm format` | Formats code using Prettier |
| `pnpm prepublishOnly` | Builds and lints before publishing |

---

## 📁 Project Structure

```
n8n-nodes-groner/
├── credentials/
│   └── GronerApi.credentials.ts    # API authentication
├── nodes/
│   └── Groner/
│       ├── fields/                 # Field definitions
│       ├── loadOptions/            # Dynamic options
│       │   ├── getStatuses.ts      # Status options
│       │   ├── getOrigins.ts       # Origin options
│       │   ├── getResponsibles.ts  # Responsible user options
│       │   ├── getDealTypes.ts     # Deal type options
│       │   ├── getTags.ts          # Tag options
│       │   ├── getStores.ts        # Store options
│       │   ├── getEtapas.ts        # Stage options
│       │   ├── getTaskTypes.ts     # Task type options
│       │   ├── getTaskStatuses.ts  # Task status options
│       │   ├── getContactProperties.ts # Contact property options
│       │   └── getDealProperties.ts    # Deal property options
│       ├── operations/             # Operation implementations
│       │   ├── CreateDeal/         # Create deal operation
│       │   ├── SearchDeals/        # Search deals operation
│       │   ├── AddTags/            # Add tags operation
│       │   ├── AddNote/            # Add note operation
│       │   ├── AddTask/            # Add task operation
│       │   ├── EditContact/        # Edit contact operation
│       │   ├── EditDeal/           # Edit deal operation
│       │   ├── SendWhatsApp/       # Send WhatsApp operation
│       │   ├── MoveDeal/           # Move deal operation
│       │   ├── GetDealQuote/       # Get deal quote operation
│       │   └── SearchTasks/        # Search tasks operation
│       ├── Groner.node.ts          # Main node file
│       └── logogroner.svg          # Custom icon
├── package.json                    # Project configuration
├── tsconfig.json                   # TypeScript configuration
└── gulpfile.js                     # Build configuration
```

---

## ⚠️ Important Notes

### API Response Handling
- **Search Operations**: Each item returned by the API becomes an individual n8n item for easy processing
- **Error Handling**: API errors are displayed in the node execution panel with detailed error messages
- **Authentication**: Uses Bearer token authentication with your API key

### Load Options
The node provides dynamic loading of options for various fields:
- **Statuses**: Available deal statuses
- **Origins**: Lead origin sources
- **Responsibles**: Available users/responsible persons
- **Deal Types**: Types of projects/deals
- **Tags**: Available tags/labels
- **Stores**: Store locations
- **Etapas**: Sales pipeline stages
- **Task Types**: Types of tasks
- **Task Statuses**: Task status options
- **Contact Properties**: Available contact properties
- **Deal Properties**: Available deal properties

### Custom Icon
- The node displays the Groner logo if the `logogroner.svg` file is present in the node directory
- The icon is automatically copied during the build process

### Data Validation
- Empty fields are automatically removed from API requests
- Required fields are validated before sending requests
- Date formats should follow YYYY-MM-DD standard
- Arrays are automatically converted to comma-separated strings for API compatibility

### Rate Limiting
- Be aware of Groner API rate limits
- Implement appropriate delays between requests in high-volume workflows

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
- Use the GitHub issue tracker
- Provide detailed error messages and steps to reproduce
- Include your n8n version and node configuration

### Submitting Pull Requests
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` and `pnpm build`
5. Submit a pull request with detailed description

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add appropriate error handling
- Include field validation where necessary

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

---

## 📞 Support

For support and questions:
- **Email**: contato@gronercrm.com.br
- **GitHub Issues**: [Create an issue](https://github.com/gronerbr/n8n-nodes-groner/issues)
- **Documentation**: This README and inline code comments

---

## 🔄 Version History

- **v0.1.9**: Current version with comprehensive CRM operations and updated field structure
- **v0.1.8**: Added WhatsApp messaging capabilities
- **v0.1.7**: Enhanced search and filtering options
- **v0.1.6**: Improved error handling and validation
- **v0.1.5**: Initial release with basic operations

For detailed changelog, see the [GitHub releases](https://github.com/gronerbr/n8n-nodes-groner/releases).
