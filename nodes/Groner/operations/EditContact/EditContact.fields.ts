import type { INodeProperties } from 'n8n-workflow';

export const editContactFields: INodeProperties[] = [
  {
    displayName: 'Deal ID',
    name: 'id',
    type: 'number',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['editarContatoPorPropriedade'] } },
  },
  {
    displayName: 'Property Name or ID',
    name: 'propriedade',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getContactProperties',
    },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['editarContatoPorPropriedade'] } },
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Value',
    name: 'valor',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['editarContatoPorPropriedade'] } },
    description: 'New property value',
  },
];
