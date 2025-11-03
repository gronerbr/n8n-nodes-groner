/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { INodeType, INodeTypeDescription, NodeConnectionType, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { getStatuses } from './loadOptions/getStatuses.js';
import { getOrigins } from './loadOptions/getOrigins.js';
import { getResponsibles } from './loadOptions/getResponsibles.js';
import { getDealTypes } from './loadOptions/getDealTypes.js';
import { getEtapas } from './loadOptions/getEtapas.js';
import { getTags } from './loadOptions/getTags.js';
import { getStores } from './loadOptions/getStores.js';
import { getTaskStatuses } from './loadOptions/getTaskStatuses.js';
import { getTaskTypes } from './loadOptions/getTaskTypes.js';
import { getDealProperties } from './loadOptions/getDealProperties.js';
import { getContactProperties } from './loadOptions/getContactProperties.js';



export class Groner implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Groner',
    name: 'groner',
    icon: 'file:logogroner.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Integrate with Groner CRM to manage deals, contacts, tasks, and more',
    defaults: { name: 'Groner' },
    inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
    credentials: [{ name: 'gronerApi', required: true }],
    properties: [
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Contact', value: 'contact' },
          { name: 'Deal', value: 'deal' },
          { name: 'Note', value: 'note' },
          { name: 'Tag', value: 'tag' },
          { name: 'Task', value: 'task' },
          { name: 'WhatsApp', value: 'whatsapp' },
        ],
        default: 'contact',
      },

      // Operation selector for Deals
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['deal'] } },
        options: [
          {
            name: 'Create',
            value: 'create',
            action: 'Create a new deal',
            description: 'Create a new deal in Groner',
          },
          {
            name: 'Edit by Property',
            value: 'editByProperty',
            action: 'Edit deal by property',
            description: 'Edit deal by specific property',
          },
          {
            name: 'Get Quote',
            value: 'getQuote',
            action: 'Get deal quote',
            description: 'Get quote information for a deal',
          },
          {
            name: 'Move',
            value: 'move',
            action: 'Move a deal',
            description: 'Move a deal to a different stage',
          },
          {
            name: 'Search',
            value: 'search',
            action: 'Search for deals',
            description: 'Search deals with filters',
          },
        ],
        default: 'create',
      },

      // Operation selector for Contacts
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['contact'] } },
        options: [
          {
            name: 'Edit by Property',
            value: 'editByProperty',
            action: 'Edit contact by property',
            description: 'Edit contact by specific property',
          },
        ],
        default: 'editByProperty',
      },

      // Operation selector for Tasks
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['task'] } },
        options: [
          {
            name: 'Create',
            value: 'create',
            action: 'Create a task',
            description: 'Create a new task',
          },
          {
            name: 'Search',
            value: 'search',
            action: 'Search tasks',
            description: 'Search for tasks',
          },
        ],
        default: 'create',
      },

      // Operation selector for Notes
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['note'] } },
        options: [
          {
            name: 'Add',
            value: 'add',
            action: 'Add a note',
            description: 'Add a note to a deal',
          },
        ],
        default: 'add',
      },

      // Operation selector for Tags
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['tag'] } },
        options: [
          {
            name: 'Add',
            value: 'add',
            action: 'Add tags',
            description: 'Add tags to a deal',
          },
        ],
        default: 'add',
      },

      // Operation selector for WhatsApp
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['whatsapp'] } },
        options: [
          {
            name: 'Send',
            value: 'send',
            action: 'Send whats app message',
            description: 'Send a WhatsApp message',
          },
        ],
        default: 'send',
      },

      // ===== CAMPOS PARA CREATE DEAL =====
      {
        displayName: 'Name',
        name: 'nome',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['create'] } },
        description: 'Lead/deal name',
      },
      {
        displayName: 'Email Address',
        name: 'email',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'john.doe@example.com',
        displayOptions: { show: { resource: ['deal'], operation: ['create'] } },
        description: 'Lead email address',
      },
      {
        displayName: 'Phone',
        name: 'telefone',
        type: 'string',
        required: true,
        default: '',
        placeholder: '+55 11 99999-9999',
        displayOptions: { show: { resource: ['deal'], operation: ['create'] } },
        description: 'Lead phone number',
      },
      {
        displayName: 'Origin Name or ID',
        name: 'codOrigem',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getOrigins' },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['create'] } },
        description: 'Lead origin. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },

      // Additional fields for Create Deal
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['deal'], operation: ['create'] } },
        options: [
          {
            displayName: 'Account Value',
            name: 'valorConta',
            type: 'number',
            typeOptions: { minValue: 0, numberPrecision: 2 },
            default: 0,
            placeholder: '0.00',
            description: 'Estimated deal value',
          },

          {
            displayName: 'Anuncio',
            name: 'anuncio',
            type: 'string',
            default: '',
            placeholder: 'Google Ads Campaign',
            description: 'Origin advertisement',
          },
          {
            displayName: 'Campanha',
            name: 'campanha',
            type: 'string',
            default: '',
            placeholder: 'Summer Sale 2024',
            description: 'Origin campaign',
          },
          {
            displayName: 'Cidade',
            name: 'cidade',
            type: 'string',
            default: '',
            placeholder: 'São Paulo',
            description: 'Lead city',
          },
          {
            displayName: 'Codigo De Lead Tracking',
            name: 'codigoLeadTracking',
            type: 'string',
            default: '',
            placeholder: 'TRACK123',
            description: 'Tracking code for the lead',
          },
          {
            displayName: 'Conjunto De Anuncios',
            name: 'conjuntoAnuncios',
            type: 'string',
            default: '',
            placeholder: 'Ad Set 1',
            description: 'Ad set for campaign',
          },

          {
            displayName: 'Documento (CPF Ou CNPJ)',
            name: 'documento',
            type: 'string',
            default: '',
            placeholder: '123.456.789-00',
            description: 'CPF/CNPJ number',
          },
          {
            displayName: 'Email Do Responsavel',
            name: 'emailResponsavel',
            type: 'string',
            default: '',
            placeholder: 'responsible@company.com',
            description: 'Responsible person email',
          },
          {
            displayName: 'ID Do Responsavel Name or ID',
            name: 'responsavelId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getResponsibles' },
            default: '',
            description: 'Responsible person. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Note',
            name: 'nota',
            type: 'string',
            default: '',
            placeholder: 'Additional notes about this lead...',
            description: 'Observation/note',
          },
          {
            displayName: 'Segmento',
            name: 'segmento',
            type: 'string',
            default: '',
            placeholder: 'Residential',
            description: 'Business segment',
          },
          {
            displayName: 'Tipo De Negocio Name or ID',
            name: 'tipoProjetoId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getDealTypes' },
            default: '',
            description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
          },
          {
            displayName: 'Tipo De Pessoa (PF Ou PJ)',
            name: 'tipoPessoa',
            type: 'options',
            options: [
              { name: 'Pessoa Física', value: 'PF' },
              { name: 'Pessoa Jurídica', value: 'PJ' },
            ],
            default: 'PF',
          },
          {
            displayName: 'Trade Name',
            name: 'nomeFantasia',
            type: 'string',
            default: '',
            placeholder: 'Company Name',
          },
          {
            displayName: 'UF',
            name: 'uf',
            type: 'string',
            default: '',
            placeholder: 'SP',
            description: 'State (UF)',
          },
          {
            displayName: 'URL',
            name: 'url',
            type: 'string',
            default: '',
            placeholder: 'https://example.com',
          },
          ],
        },

      // ===== CAMPOS PARA SEARCH DEALS =====


      // Filters section for Search Deals
      {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add Filter',
        default: {},
        displayOptions: { show: { resource: ['deal'], operation: ['search'] } },
        options: [
          {
            displayName: 'Deal Type Name or ID',
            name: 'dealTypeId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getDealTypes' },
            default: '',
            description: 'Filter by deal type. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Pre-Seller Name or ID',
            name: 'preSellerId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getResponsibles' },
            default: '',
            description: 'Filter by pre-seller. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Responsible Seller Name or ID',
            name: 'responsibleSellerId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getResponsibles' },
            default: '',
            description: 'Filter by responsible seller. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Responsible Technician Name or ID',
            name: 'responsibleTechnicianId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getResponsibles' },
            default: '',
            description: 'Filter by responsible technician. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Stage Name or ID',
            name: 'stageId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getEtapas' },
            default: '',
            description: 'Filter by deal stage. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Status Name or ID',
            name: 'statusId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getStatuses' },
            default: '',
            description: 'Filter by deal status. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
        ],
      },

      // Location section for Search Deals
      {
        displayName: 'Location',
        name: 'location',
        type: 'collection',
        placeholder: 'Add Location Filter',
        default: {},
        displayOptions: { show: { resource: ['deal'], operation: ['search'] } },
        options: [
          {
            displayName: 'City',
            name: 'city',
            type: 'string',
            default: '',
            placeholder: 'São Paulo',
            description: 'Filter by city',
          },
          {
            displayName: 'State',
            name: 'state',
            type: 'string',
            default: '',
            placeholder: 'SP',
            description: 'Filter by state (UF, e.g., SP, RJ, MG)',
          },
        ],
      },

      // Financial section for Search Deals
      {
        displayName: 'Financial',
        name: 'financial',
        type: 'collection',
        placeholder: 'Add Financial Filter',
        default: {},
        displayOptions: { show: { resource: ['deal'], operation: ['search'] } },
        options: [
          {
            displayName: 'Final Consumption (kWh)',
            name: 'finalConsumption',
            type: 'number',
            typeOptions: { minValue: 0, numberPrecision: 2 },
            default: 0,
            placeholder: '1000.00',
            description: 'Maximum consumption in kWh',
          },
          {
            displayName: 'Final Power (kW)',
            name: 'finalPower',
            type: 'number',
            typeOptions: { minValue: 0, numberPrecision: 2 },
            default: 0,
            placeholder: '100.00',
            description: 'Maximum power in kW',
          },
          {
            displayName: 'Final Value',
            name: 'finalValue',
            type: 'number',
            typeOptions: { minValue: 0, numberPrecision: 2 },
            default: 0,
            placeholder: '100000.00',
            description: 'Maximum deal value',
          },
          {
            displayName: 'Initial Consumption (kWh)',
            name: 'initialConsumption',
            type: 'number',
            typeOptions: { minValue: 0, numberPrecision: 2 },
            default: 0,
            placeholder: '0.00',
            description: 'Minimum consumption in kWh',
          },
          {
            displayName: 'Initial Power (kW)',
            name: 'initialPower',
            type: 'number',
            typeOptions: { minValue: 0, numberPrecision: 2 },
            default: 0,
            placeholder: '0.00',
            description: 'Minimum power in kW',
          },
          {
            displayName: 'Initial Value',
            name: 'initialValue',
            type: 'number',
            typeOptions: { minValue: 0, numberPrecision: 2 },
            default: 0,
            placeholder: '0.00',
            description: 'Minimum deal value',
          },
        ],
      },

      // Dates section for Search Deals
      {
        displayName: 'Dates',
        name: 'dates',
        type: 'collection',
        placeholder: 'Add Date Filter',
        default: {},
        displayOptions: { show: { resource: ['deal'], operation: ['search'] } },
        options: [
          {
            displayName: 'End Date',
            name: 'endDate',
            type: 'string',
            default: '',
            placeholder: '2024-12-31',
            description: 'Filter deals created until this date',
          },
          {
            displayName: 'Final Closing Forecast Date',
            name: 'finalClosingForecastDate',
            type: 'string',
            default: '',
            placeholder: '2024-12-31',
            description: 'Maximum closing forecast date',
          },
          {
            displayName: 'Final Sale Date',
            name: 'finalSaleDate',
            type: 'string',
            default: '',
            placeholder: '2024-12-31',
            description: 'Maximum sale date',
          },
          {
            displayName: 'Initial Closing Forecast Date',
            name: 'initialClosingForecastDate',
            type: 'string',
            default: '',
            placeholder: '2024-01-01',
            description: 'Minimum closing forecast date',
          },
          {
            displayName: 'Initial Sale Date',
            name: 'initialSaleDate',
            type: 'string',
            default: '',
            placeholder: '2024-01-01',
            description: 'Minimum sale date',
          },
          {
            displayName: 'Start Date',
            name: 'startDate',
            type: 'string',
            default: '',
            placeholder: '2024-01-01',
            description: 'Filter deals created from this date',
          },
        ],
      },

      // Additional fields for Search Deals
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['deal'], operation: ['search'] } },
        options: [
          {
            displayName: 'Ad Set',
            name: 'adSet',
            type: 'string',
            default: '',
            placeholder: 'Ad Set 1',
            description: 'Filter by ad set',
          },
          {
            displayName: 'Advertisement',
            name: 'advertisement',
            type: 'string',
            default: '',
            placeholder: 'Google Ads Campaign',
            description: 'Filter by advertisement',
          },
          {
            displayName: 'Campaign',
            name: 'campaign',
            type: 'string',
            default: '',
            placeholder: 'Summer Sale 2024',
            description: 'Filter by marketing campaign',
          },
          {
            displayName: 'Contact Owner ID',
            name: 'contactOwnerId',
            type: 'string',
            default: '',
            placeholder: 'owner123',
            description: 'Filter by contact owner ID',
          },
          {
            displayName: 'Final Qualification',
            name: 'finalQualification',
            type: 'number',
            typeOptions: { minValue: 0, maxValue: 10, numberPrecision: 1 },
            default: 0,
            placeholder: '10.0',
            description: 'Maximum qualification score',
          },
          {
            displayName: 'Indicator',
            name: 'indicator',
            type: 'string',
            default: '',
            placeholder: 'performance indicator',
            description: 'Performance indicator',
          },
          {
            displayName: 'Initial Qualification',
            name: 'initialQualification',
            type: 'number',
            typeOptions: { minValue: 0, maxValue: 10, numberPrecision: 1 },
            default: 0,
            placeholder: '0.0',
            description: 'Minimum qualification score',
          },
          {
            displayName: 'Lead ID',
            name: 'leadId',
            type: 'number',
            typeOptions: { minValue: 1 },
            default: 0,
            placeholder: '12345',
            description: 'Filter by specific lead ID',
          },
          {
            displayName: 'N Status History IDs',
            name: 'nStatusHistoryIds',
            type: 'string',
            default: '',
            placeholder: '1,2,3',
            description: 'Filter by negative status history IDs',
          },
          {
            displayName: 'Origin Name or ID',
            name: 'originIds',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getOrigins' },
            default: '',
            description: 'Filter by origin IDs. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Page Size',
            name: 'pageSize',
            type: 'number',
            typeOptions: { minValue: 1, maxValue: 100 },
            default: 20,
            description: 'Number of deals to return per page',
          },
          {
            displayName: 'Return Only List',
            name: 'returnOnlyList',
            type: 'boolean',
            default: false,
            description: 'Whether to return only the deals list instead of the full API response',
          },
          {
            displayName: 'Search Criteria',
            name: 'criteria',
            type: 'string',
            default: '',
            placeholder: 'Specific search criteria',
            description: 'Additional search criteria',
          },
          {
            displayName: 'Search Query',
            name: 'query',
            type: 'string',
            default: '',
            placeholder: 'Search by deal name, contact, or description',
            description: 'General search term to find deals',
          },
          {
            displayName: 'Sort By',
            name: 'sortBy',
            type: 'string',
            default: '',
            placeholder: 'name, value, date',
            description: 'Field to sort results by (e.g., name, value, date)',
          },
          {
            displayName: 'Status History IDs',
            name: 'statusHistoryIds',
            type: 'string',
            default: '',
            placeholder: '1,2,3',
            description: 'Filter by status history IDs',
          },
          {
            displayName: 'Store Name or ID',
            name: 'storeIds',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getStores' }, // Supondo que haja um endpoint para lojas
            default: '',
            description: 'Filter by store IDs. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Tag Name or ID',
            name: 'tagIds',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getTags' }, // Supondo que haja um endpoint para tags
            default: '',
            description: 'Filter by tag IDs. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
        ],
      },

      // ===== CAMPOS PARA ADD NOTE =====
      {
        displayName: 'Negocio ID',
        name: 'dealId',
        type: 'number',
        typeOptions: { minValue: 1 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['note'], operation: ['add'] } },
        placeholder: '12345',
        description: 'The deal ID to add a note to',
      },
      {
        displayName: 'Nota',
        name: 'ocorrencia',
        type: 'string',
        typeOptions: { rows: 4 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['note'], operation: ['add'] } },
        placeholder: 'Enter your note here...',
        description: 'The note content',
      },
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['note'], operation: ['add'] } },
        options: [
          {
            displayName: 'Marcações',
            name: 'marcacoes',
            type: 'string',
            default: '',
            placeholder: '@user1, @user2',
            description: 'Mentions or tags',
          },
        ],
      },

      // ===== CAMPOS PARA MOVE DEAL =====
      {
        displayName: 'Deal Name or ID',
        name: 'dealId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['move'] } },
        placeholder: '12345 or Deal Name',
        description: 'The deal to move',
      },
      {
        displayName: 'Status Name or ID',
        name: 'statusId',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getStatuses' },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['move'] } },
        description: 'The status to move the deal to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Additional Options',
        name: 'additionalOptions',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: { show: { resource: ['deal'], operation: ['move'] } },
        options: [
          {
            displayName: 'Validar Status Disponíveis',
            name: 'validaStatusDisponivel',
            type: 'boolean',
            default: false,
            description: 'Whether to validate available statuses before moving the deal',
          },
        ],
      },

      // ===== CAMPOS PARA GET QUOTE =====
      {
        displayName: 'Deal Name or ID',
        name: 'dealId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['getQuote'] } },
        placeholder: '12345 or Deal Name',
        description: 'The deal to get quote for',
      },





      // ===== CAMPOS PARA EDIT CONTACT BY PROPERTY =====
      {
        displayName: 'Contact Name or ID',
        name: 'contactId',
        type: 'number',
        typeOptions: { minValue: 1 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['contact'], operation: ['editByProperty'] } },
        placeholder: '12345',
        description: 'The contact to edit',
      },
      {
        displayName: 'Property Name or ID',
        name: 'propriedade',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getContactProperties' },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['contact'], operation: ['editByProperty'] } },
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
      },
      {
        displayName: 'Value',
        name: 'valor',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['contact'], operation: ['editByProperty'] } },
        description: 'The value to set',
      },

      // ===== CAMPOS PARA EDIT DEAL BY PROPERTY =====
      {
        displayName: 'Deal Name or ID',
        name: 'dealId',
        type: 'number',
        typeOptions: { minValue: 1 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['editByProperty'] } },
        placeholder: '12345',
        description: 'The deal to edit',
      },
      {
        displayName: 'Property Name or ID',
        name: 'propriedade',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getDealProperties' },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['editByProperty'] } },
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
      },
      {
        displayName: 'Value',
        name: 'valor',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['deal'], operation: ['editByProperty'] } },
        description: 'The value to set',
      },

      // ===== CAMPOS PARA CREATE TASK =====
      {
        displayName: 'Title',
        name: 'titulo',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['task'], operation: ['create'] } },
        description: 'Task title',
      },
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['task'], operation: ['create'] } },
        options: [
          {
            displayName: 'Description',
            name: 'descricao',
            type: 'string',
            typeOptions: { rows: 3 },
            default: '',
            description: 'Task description',
          },
          {
            displayName: 'Start Date',
            name: 'dataInicial',
            type: 'string',
            default: '',
            description: 'Initial date',
          },
          {
            displayName: 'Delivery Date',
            name: 'dataEntrega',
            type: 'string',
            default: '',
          },
        ],
      },
      {
        displayName: 'Project ID',
        name: 'projetoId',
        type: 'number',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['task'], operation: ['create'] } },
        placeholder: '12345',
        description: 'The project to create a task for',
      },
      {
        displayName: 'Status Name or ID',
        name: 'statusId',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getTaskStatuses' },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['task'], operation: ['create'] } },
        description: 'Task status. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Task Type Name or ID',
        name: 'tipoId',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getTaskTypes' },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['task'], operation: ['create'] } },
        description: 'Task type. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'User Names or IDs',
        name: 'usuariosIds',
        type: 'multiOptions',
        typeOptions: { loadOptionsMethod: 'getResponsibles' },
        required: true,
        default: [],
        displayOptions: { show: { resource: ['task'], operation: ['create'] } },
        description: 'User IDs assigned to the task. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },



      // ===== CAMPOS PARA SEARCH TASKS =====
      {
        displayName: 'Quantity of Items',
        name: 'pageSize',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 100 },
        required: true,
        default: 20,
        displayOptions: { show: { resource: ['task'], operation: ['search'] } },
        description: 'Number of tasks to return per page',
      },
      {
        displayName: 'Pesquisar',
        name: 'query',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['task'], operation: ['search'] } },
        placeholder: 'Search by task title or description',
        description: 'Search query for tasks',
      },

      // Additional fields for Search Tasks
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['task'], operation: ['search'] } },
        options: [
          {
            displayName: 'Data Final',
            name: 'dataFinal',
            type: 'string',
            default: '',
            placeholder: '2024-12-31',
            description: 'Filter tasks until this date',
          },
          {
            displayName: 'Data Inicial',
            name: 'dataInicial',
            type: 'string',
            default: '',
            placeholder: '2024-01-01',
            description: 'Filter tasks from this date',
          },
          {
            displayName: 'Lead ID',
            name: 'leadId',
            type: 'number',
            typeOptions: { minValue: 1 },
            default: 0,
            placeholder: '12345',
            description: 'Filter by lead ID',
          },
          {
            displayName: 'Ordenar Por',
            name: 'ordenarPor',
            type: 'string',
            default: '',
            placeholder: 'title, date, status',
            description: 'Field to sort results by',
          },
          {
            displayName: 'Page Number',
            name: 'pageNumber',
            type: 'number',
            typeOptions: { minValue: 1 },
            default: 1,
            description: 'Page number for pagination',
          },
          {
            displayName: 'Projeto ID',
            name: 'projetoId',
            type: 'number',
            typeOptions: { minValue: 1 },
            default: 0,
            placeholder: '12345',
            description: 'Filter by project ID',
          },
          {
            displayName: 'Store Name or ID',
            name: 'lojasIds',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getStores' },
            default: '',
            description: 'Filter by stores. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Task Status Name or ID',
            name: 'statusId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getTaskStatuses' },
            default: '',
            description: 'Filter by task status. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'Task Type Name or ID',
            name: 'tipoId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getTaskTypes' },
            default: '',
            description: 'Filter by task type. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
          {
            displayName: 'User Name or ID',
            name: 'usuarioId',
            type: 'options',
            typeOptions: { loadOptionsMethod: 'getResponsibles' },
            default: '',
            description: 'Filter by user. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
          },
        ],
      },

      // ===== CAMPOS PARA ADD TAGS =====
      {
        displayName: 'Negocio ID',
        name: 'dealId',
        type: 'number',
        typeOptions: { minValue: 1 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['tag'], operation: ['add'] } },
        placeholder: '12345',
        description: 'The deal ID to add tags to',
      },
      {
        displayName: 'Etiquetas Name or ID',
        name: 'tagIds',
        type: 'options',
        typeOptions: { loadOptionsMethod: 'getTags' },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['tag'], operation: ['add'] } },
        description: 'Tags to add to the deal. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },

      // ===== CAMPOS PARA SEND WHATSAPP =====
      {
        displayName: 'Contato ID',
        name: 'leadId',
        type: 'number',
        typeOptions: { minValue: 1 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['whatsapp'], operation: ['send'] } },
        placeholder: '12345',
        description: 'The contact ID to send message to',
      },
      {
        displayName: 'Mensagem',
        name: 'mensagem',
        type: 'string',
        typeOptions: { rows: 4 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['whatsapp'], operation: ['send'] } },
        placeholder: 'Enter your message here...',
        description: 'The message to send',
      },
      {
        displayName: 'Additional Options',
        name: 'additionalOptions',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: { show: { resource: ['whatsapp'], operation: ['send'] } },
        options: [
          {
            displayName: 'Celular',
            name: 'celular',
            type: 'string',
            default: '',
            placeholder: '+55 11 99999-9999',
            description: 'Direct phone number',
          },
          {
            displayName: 'Enviar Para Lead',
            name: 'lead',
            type: 'boolean',
            default: false,
          },
          {
            displayName: 'Enviar para Pré Vendedor',
            name: 'preVendedor',
            type: 'boolean',
            default: false,
          },
          {
            displayName: 'Enviar Para Técnico',
            name: 'tecnico',
            type: 'boolean',
            default: false,
          },
          {
            displayName: 'Enviar para Vendedor',
            name: 'vendedor',
            type: 'boolean',
            default: false,
          },
          {
            displayName: 'Loja ID',
            name: 'lojaId',
            type: 'number',
            typeOptions: { minValue: 1 },
            default: '',
            placeholder: '12345',
          },
          {
            displayName: 'Url Da Imagem',
            name: 'urlImagem',
            type: 'string',
            default: '',
            placeholder: 'https://example.com/image.jpg',
            description: 'Image attachment URL',
          },
          {
            displayName: 'Url Do Audio',
            name: 'urlAudio',
            type: 'string',
            default: '',
            placeholder: 'https://example.com/audio.mp3',
            description: 'Audio attachment URL',
          },
          {
            displayName: 'Url Do Documento',
            name: 'urlDocumento',
            type: 'string',
            default: '',
            placeholder: 'https://example.com/document.pdf',
            description: 'Document attachment URL',
          },
          {
            displayName: 'Url Do Video',
            name: 'urlVideo',
            type: 'string',
            default: '',
            placeholder: 'https://example.com/video.mp4',
            description: 'Video attachment URL',
          },
        ],
      },
    ],
  };

  methods = {
    loadOptions: {
      getStatuses,
      getOrigins,
      getResponsibles,
      getDealTypes,
      getEtapas,
      getTags,
      getStores,
      getTaskStatuses,
      getTaskTypes,
      getDealProperties,
      getContactProperties,
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    // Get credentials once to build base URL
    const credentials = await this.getCredentials('gronerApi');
    const baseURL = `https://${credentials.tenant}.api.groner.app`;

    // Helper function to handle JSON response
    const handleResponse = (response: any) => {
      if (typeof response === 'string') {
        try {
          return JSON.parse(response);
        } catch (e) {
          return response;
        }
      }
      return response;
    };

    // Helper function to handle search deals response with returnOnlyList option
    const handleSearchDealsResponse = (response: any, returnOnlyList: boolean) => {
      const rawResponse = handleResponse(response);
      if (returnOnlyList && rawResponse) {
        if (rawResponse.Content && rawResponse.Content.list) {
          return rawResponse.Content.list;
        }
      }
      return rawResponse;
    };

    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter('resource', i) as string;
        const operation = this.getNodeParameter('operation', i) as string;

        let responseData: any;

        // Deal operations
        if (resource === 'deal') {
          if (operation === 'create') {
            const codOrigem = this.getNodeParameter('codOrigem', i) as string;
            const nome = this.getNodeParameter('nome', i) as string;
            const email = this.getNodeParameter('email', i) as string;
            const telefone = this.getNodeParameter('telefone', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as any;



            const body = {
              nome,
              email,
              telefone,
              cidade: additionalFields.cidade || '',
              documento: additionalFields.documento || '',
              tipoPessoa: additionalFields.tipoPessoa || 'PF',
              uf: additionalFields.uf || '',
              valorConta: additionalFields.valorConta || 0,
              responsavelId: additionalFields.responsavelId || '',
              emailResponsavel: additionalFields.emailResponsavel || '',
              nota: additionalFields.nota || '',
              url: additionalFields.url || '',
              campanha: additionalFields.campanha || '',
              anuncio: additionalFields.anuncio || '',
              conjuntoAnuncios: additionalFields.conjuntoAnuncios || '',
              codigoLeadTracking: additionalFields.codigoLeadTracking || '',
              nomeFantasia: additionalFields.nomeFantasia || '',
              segmento: additionalFields.segmento || '',
              tipoProjetoId: additionalFields.tipoProjetoId || '',
            };

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'POST',
              url: `${baseURL}/api/lead/FluentForm/${codOrigem}`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body,
            });
            responseData = handleResponse(response);
          }

          else if (operation === 'editByProperty') {
            const dealId = this.getNodeParameter('dealId', i) as number;
            const propriedade = this.getNodeParameter('propriedade', i) as string;
            const valor = this.getNodeParameter('valor', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'PUT',
              url: `${baseURL}/api/projeto/${dealId}`,
              body: {
                propriedade,
                valor,
              },
            });
            responseData = handleResponse(response);
          }

          else if (operation === 'getQuote') {
            const dealId = this.getNodeParameter('dealId', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'GET',
              url: `${baseURL}/api/orcamento/unico/${dealId}?pageSize=5&pageNumber=1`,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            });
            responseData = handleResponse(response);
          }

          else if (operation === 'move') {
            const dealId = this.getNodeParameter('dealId', i) as string;
            const statusId = this.getNodeParameter('statusId', i) as string;
            const moveOptions = this.getNodeParameter('additionalOptions', i, {}) as any;
            const validaStatusDisponivel = (moveOptions.validaStatusDisponivel as boolean) ?? false;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'POST',
              url: `${baseURL}/api/projeto/adicionarStatus/${dealId}?validaStatusDisponivel=${validaStatusDisponivel}`,
              body: {
                statusId,
              },
            });
            responseData = handleResponse(response);
          }

          else if (operation === 'search') {
            const filters = this.getNodeParameter('filters', i, {}) as any;
            const location = this.getNodeParameter('location', i, {}) as any;
            const financial = this.getNodeParameter('financial', i, {}) as any;
            const dates = this.getNodeParameter('dates', i, {}) as any;
            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;

            const pageSize = additionalFields.pageSize ?? 20;
            const query = additionalFields.query ?? '';
            const criterio = additionalFields.criteria ?? '';
            const returnOnlyList = additionalFields.returnOnlyList ?? false;

            const qs: any = {
              pageSize,
              query,
              criterio,
              tipoProjetoId: filters?.dealTypeId,
              etapaId: filters?.stageId,
              statusId: filters?.statusId,
              vendedorResponsavelId: filters?.responsibleSellerId,
              tecnicoResponsavelId: filters?.responsibleTechnicianId,
              preVendedorId: filters?.preSellerId,
              leadId: additionalFields?.leadId,
              lojasIds: additionalFields?.storesIds,
              cidade: location?.city,
              uf: location?.state,
              potenciaInicial: financial?.initialPower,
              potenciaFinal: financial?.finalPower,
              valorInicial: financial?.initialValue,
              valorFinal: financial?.finalValue,
              consumoInicial: financial?.initialConsumption,
              consumoFinal: financial?.finalConsumption,
              etiquetasIds: additionalFields?.tagsIds,
              origensIds: additionalFields?.originsIds,
              statusHistoricoIds: additionalFields?.statusHistoryIds,
              nStatusHistoricoIds: additionalFields?.nStatusHistoryIds,
              dataInicial: dates?.startDate,
              dataFinal: dates?.endDate,
              dataPrevisaoFechamentoInicial: dates?.initialClosingForecastDate,
              dataPrevisaoFechamentoFinal: dates?.finalClosingForecastDate,
              dataPropostaAceitaInicial: dates?.initialProposalDate,
              dataPropostaAceitaFinal: dates?.finalProposalDate,
              dataVendaInicial: dates?.initialSaleDate,
              dataVendaFinal: dates?.finalSaleDate,
              dataPerdaInicial: dates?.initialLossDate,
              dataPerdaFinal: dates?.finalLossDate,
              ordenarPor: additionalFields?.sortBy,
              qualificacaoInicial: additionalFields?.initialQualification,
              qualificacaoFinal: additionalFields?.finalQualification,
              indicador: additionalFields?.indicator,
              donoContatoId: additionalFields?.contactOwnerId,
              campanha: additionalFields?.campaign,
              anuncio: additionalFields?.advertisement,
              conjuntoAnuncios: additionalFields?.adSet,
            };

            // Remove undefined values
            Object.keys(qs).forEach(key => {
              if (qs[key] === undefined || qs[key] === '') {
                delete qs[key];
              }
            });

              const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'GET',
              url: `${baseURL}/api/projeto/cards`,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
              },
              qs,
            });
            responseData = handleSearchDealsResponse(response, returnOnlyList);
          }
        }

        // Contact operations
        else if (resource === 'contact') {
          if (operation === 'editByProperty') {
            const contactId = this.getNodeParameter('contactId', i) as number;
            const propriedade = this.getNodeParameter('propriedade', i) as string;
            const valor = this.getNodeParameter('valor', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'PUT',
              url: `${baseURL}/api/lead/${contactId}`,
              body: {
                propriedade,
                valor,
              },
            });
            responseData = handleResponse(response);
          }
        }

        // Task operations
        else if (resource === 'task') {
          if (operation === 'create') {
            const titulo = this.getNodeParameter('titulo', i) as string;
            const taskAdditional = this.getNodeParameter('additionalFields', i, {}) as any;
            const descricao = taskAdditional.descricao as string;
            const tipoId = this.getNodeParameter('tipoId', i) as string;
            const statusId = this.getNodeParameter('statusId', i) as string;
            const projetoId = this.getNodeParameter('projetoId', i) as number;
            const usuariosIds = this.getNodeParameter('usuariosIds', i) as string[];
            const dataInicial = taskAdditional.dataInicial as string;
            const dataEntrega = taskAdditional.dataEntrega as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'POST',
              url: `${baseURL}/api/tarefa`,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: {
                titulo,
                descricao,
                tipoId,
                statusId,
                projetoId,
                usuariosIds,
                dataInicial,
                dataEntrega,
              },
            });
            responseData = handleResponse(response);
          }

          else if (operation === 'search') {
            const pageSize = this.getNodeParameter('pageSize', i) as number;
            const query = this.getNodeParameter('query', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;

            const qs: any = {
              leadId: additionalFields?.leadId,
              projetoId: additionalFields?.projetoId,
              tipoId: additionalFields?.tipoId,
              pageNumber: additionalFields?.pageNumber,
              pageSize,
              query,
              usuarioId: additionalFields?.usuarioId,
              lojasIds: additionalFields?.lojasIds,
              statusId: additionalFields?.statusId,
              ordenarPor: additionalFields?.ordenarPor,
              dataInicial: additionalFields?.dataInicial,
              dataFinal: additionalFields?.dataFinal,
            };

            // Remove undefined values
            Object.keys(qs).forEach(key => {
              if (qs[key] === undefined || qs[key] === '') {
                delete qs[key];
              }
            });

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'GET',
              url: `${baseURL}/api/tarefa`,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
              },
              qs,
            });
            responseData = handleResponse(response);
          }
        }

        // Note operations
        else if (resource === 'note') {
          if (operation === 'add') {
            const dealId = this.getNodeParameter('dealId', i) as number;
            const ocorrencia = this.getNodeParameter('ocorrencia', i) as string;
            const noteAdditional = this.getNodeParameter('additionalFields', i, {}) as any;
            const marcacoes = noteAdditional.marcacoes as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'POST',
              url: `${baseURL}/api/projeto/adicionarocorrencia/${dealId}`,
              body: {
                ocorrencia,
                marcacoes,
              },
            });
            responseData = handleResponse(response);
          }
        }

        // Tag operations
        else if (resource === 'tag') {
          if (operation === 'add') {
            const dealId = this.getNodeParameter('dealId', i) as number;
            const tagIds = this.getNodeParameter('tagIds', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'POST',
              url: `${baseURL}/api/projeto/AlterarEtiquetas/${dealId}`,
              body: tagIds,
            });
            responseData = handleResponse(response);
          }
        }

        // WhatsApp operations
        else if (resource === 'whatsapp') {
          if (operation === 'send') {
            const leadId = this.getNodeParameter('leadId', i) as number;
            const mensagem = this.getNodeParameter('mensagem', i) as string;
            const waOptions = this.getNodeParameter('additionalOptions', i, {}) as any;
            const celular = waOptions.celular as string;
            const urlImagem = waOptions.urlImagem as string;
            const urlAudio = waOptions.urlAudio as string;
            const urlVideo = waOptions.urlVideo as string;
            const urlDocumento = waOptions.urlDocumento as string;
            const lojaId = waOptions.lojaId as number;
            const preVendedor = (waOptions.preVendedor as boolean) ?? false;
            const vendedor = (waOptions.vendedor as boolean) ?? false;
            const tecnico = (waOptions.tecnico as boolean) ?? false;
            const lead = (waOptions.lead as boolean) ?? false;

            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', {
              method: 'POST',
              url: `${baseURL}/api/WhatsApp/enviarMensagem`,
              body: {
                leadId,
                mensagem,
                celular,
                urlImagem,
                urlAudio,
                urlVideo,
                urlDocumento,
								lojaId,
                preVendedor,
                vendedor,
                tecnico,
                lead,
              },
            });
            responseData = handleResponse(response);
          }
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } },
        );

        returnData.push(...executionData);

      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } },
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
