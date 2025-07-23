import type { INodeProperties } from 'n8n-workflow';

export const editDealFields: INodeProperties[] = [
  {
    displayName: 'Deal ID',
    name: 'id',
    type: 'number',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['editarNegocioPorPropriedade'] } },
  },
  {
    displayName: 'Property Name or ID',
    name: 'propriedade',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getDealProperties',
    },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['editarNegocioPorPropriedade'] } },
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Value',
    name: 'valor',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['editarNegocioPorPropriedade'] } },
    description: 'New property value',
  },
];
