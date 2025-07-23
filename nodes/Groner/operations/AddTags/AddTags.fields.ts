import type { INodeProperties } from 'n8n-workflow';

export const addTagsFields: INodeProperties[] = [
  {
    displayName: 'Deal ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['adicionarEtiquetas'] } },
    description: 'ID do negócio',
  },
  {
    displayName: 'Tag Names or IDs',
    name: 'etiquetas',
    type: 'multiOptions',
    typeOptions: {
      loadOptionsMethod: 'getTags',
    },
    required: true,
    default: [],
    displayOptions: { show: { operation: ['adicionarEtiquetas'] } },
    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
];
