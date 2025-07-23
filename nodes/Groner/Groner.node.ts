import type { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData, NodeConnectionType } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { getStatuses } from './loadOptions/getStatuses.js';
import { getOrigins } from './loadOptions/getOrigins.js';
import { getResponsibles } from './loadOptions/getResponsibles.js';
import { getDealTypes } from './loadOptions/getDealTypes.js';
import { getTags } from './loadOptions/getTags.js';
import { getStores } from './loadOptions/getStores.js';
import { getEtapas } from './loadOptions/getEtapas.js';
import { getTaskTypes } from './loadOptions/getTaskTypes.js';
import { getTaskStatuses } from './loadOptions/getTaskStatuses.js';
import { getContactProperties } from './loadOptions/getContactProperties.js';
import { getDealProperties } from './loadOptions/getDealProperties.js';

// Imports consolidados
import { createDealFields } from './operations/CreateDeal/CreateDeal.fields';
import { executeCreateDeal } from './operations/CreateDeal/CreateDeal.operation';
import { createDealDeclaration } from './operations/CreateDeal/CreateDeal.declaration';
import { addNoteFields } from './operations/AddNote/AddNote.fields';
import { executeAddNote } from './operations/AddNote/AddNote.operation';
import { addNoteDeclaration } from './operations/AddNote/AddNote.declaration';
import { addTagsFields } from './operations/AddTags/AddTags.fields';
import { executeAddTags } from './operations/AddTags/AddTags.operation';
import { addTagsDeclaration } from './operations/AddTags/AddTags.declaration';
import { addTaskFields } from './operations/AddTask/AddTask.fields';
import { executeAddTask } from './operations/AddTask/AddTask.operation';
import { addTaskDeclaration } from './operations/AddTask/AddTask.declaration';
import { editContactFields } from './operations/EditContact/EditContact.fields';
import { executeEditContact } from './operations/EditContact/EditContact.operation';
import { editContactDeclaration } from './operations/EditContact/EditContact.declaration';
import { editDealFields } from './operations/EditDeal/EditDeal.fields';
import { executeEditDeal } from './operations/EditDeal/EditDeal.operation';
import { editDealDeclaration } from './operations/EditDeal/EditDeal.declaration';
import { sendWhatsAppFields } from './operations/SendWhatsApp/SendWhatsApp.fields';
import { executeSendWhatsApp } from './operations/SendWhatsApp/SendWhatsApp.operation';
import { sendWhatsAppDeclaration } from './operations/SendWhatsApp/SendWhatsApp.declaration';
import { moveDealFields } from './operations/MoveDeal/MoveDeal.fields';
import { executeMoveDeal } from './operations/MoveDeal/MoveDeal.operation';
import { moveDealDeclaration } from './operations/MoveDeal/MoveDeal.declaration';
import { getDealQuoteFields } from './operations/GetDealQuote/GetDealQuote.fields';
import { executeGetDealQuote } from './operations/GetDealQuote/GetDealQuote.operation';
import { getDealQuoteDeclaration } from './operations/GetDealQuote/GetDealQuote.declaration';
import { searchDealsFields } from './operations/SearchDeals/SearchDeals.fields';
import { executeSearchDeals } from './operations/SearchDeals/SearchDeals.operation';
import { searchDealsDeclaration } from './operations/SearchDeals/SearchDeals.declaration';
import { searchTasksFields } from './operations/SearchTasks/SearchTasks.fields';
import { executeSearchTasks } from './operations/SearchTasks/SearchTasks.operation';
import { searchTasksDeclaration } from './operations/SearchTasks/SearchTasks.declaration';

// Tipos
type OperationKey =
  | 'criarNegocio' | 'pesquisarNegocios' | 'adicionarEtiquetas' | 'adicionarNota' | 'adicionarTarefa'
  | 'editarContatoPorPropriedade' | 'editarNegocioPorPropriedade' | 'enviarMensagemWhatsApp'
  | 'moverNegocio' | 'obterOrcamentoNegocio' | 'pesquisarTarefas';

type OperationExecutor = (this: IExecuteFunctions, itemIndex: number, items: INodeExecutionData[], credentials: any) => Promise<any>;

// Configuração consolidada
const CONFIG = {
  node: {
    displayName: 'Groner',
    name: 'groner',
    group: ['transform'] as string[],
    version: 1,
    description: 'Integration with Groner API',
    icon: 'file:logogroner.svg',
    credentials: 'gronerApi',
  },
  operations: {
    declarations: [
      createDealDeclaration, addNoteDeclaration, addTagsDeclaration, addTaskDeclaration,
      editContactDeclaration, editDealDeclaration, sendWhatsAppDeclaration, moveDealDeclaration,
      getDealQuoteDeclaration, searchDealsDeclaration, searchTasksDeclaration,
    ],
    executors: new Map<OperationKey, OperationExecutor>([
      ['criarNegocio', executeCreateDeal],
      ['pesquisarNegocios', executeSearchDeals],
      ['adicionarEtiquetas', executeAddTags],
      ['adicionarNota', executeAddNote],
      ['adicionarTarefa', executeAddTask],
      ['editarContatoPorPropriedade', executeEditContact],
      ['editarNegocioPorPropriedade', executeEditDeal],
      ['enviarMensagemWhatsApp', executeSendWhatsApp],
      ['moverNegocio', executeMoveDeal],
      ['obterOrcamentoNegocio', executeGetDealQuote],
      ['pesquisarTarefas', executeSearchTasks],
    ]),
    fields: [
      ...createDealFields, ...addNoteFields, ...addTagsFields, ...addTaskFields,
      ...editContactFields, ...editDealFields, ...sendWhatsAppFields, ...moveDealFields,
      ...getDealQuoteFields, ...searchDealsFields, ...searchTasksFields,
    ],
  },
} as const;

export class Groner implements INodeType {
  description: INodeTypeDescription = {
    displayName: CONFIG.node.displayName,
    name: CONFIG.node.name,
    group: CONFIG.node.group,
    version: CONFIG.node.version,
    subtitle: '={{ $parameter["operation"] }}',
    description: CONFIG.node.description,
    icon: CONFIG.node.icon,
    defaults: { name: CONFIG.node.displayName },
    inputs: ['main' as NodeConnectionType],
    outputs: ['main' as NodeConnectionType],
    credentials: [{ name: CONFIG.node.credentials, required: true }],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: CONFIG.operations.declarations.map(d => ({
          name: d.label,
          value: d.operation,
          description: d.description,
        })),
        default: '',
      },
      ...CONFIG.operations.fields,
    ],
  };

    methods = {
    loadOptions: {
      getStatuses,
      getOrigins,
      getResponsibles,
      getDealTypes,
      getTags,
      getStores,
      getEtapas,
      getTaskTypes,
      getTaskStatuses,
      getContactProperties,
      getDealProperties,
    }
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const operation = this.getNodeParameter('operation', 0) as OperationKey;
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    if (!CONFIG.operations.executors.has(operation)) {
      throw new NodeOperationError(
        this.getNode(),
        `Unsupported operation: ${operation}. Available: ${Array.from(CONFIG.operations.executors.keys()).join(', ')}`
      );
    }

    for (let i = 0; i < items.length; i++) {
      try {
        const credentials = await this.getCredentials(CONFIG.node.credentials);
        const responseData = await CONFIG.operations.executors.get(operation)!.call(this, i, items, credentials);

        returnData.push(...this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } },
        ));
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push(...this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } },
          ));
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
