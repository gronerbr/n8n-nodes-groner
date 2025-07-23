import type { INodeProperties } from 'n8n-workflow';

export const moveDealFields: INodeProperties[] = [
  {
    displayName: 'Deal ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['moverNegocio'] } },
    description: 'ID do negócio',
  },
  {
    displayName: 'Status Name or ID',
    name: 'statusId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getStatuses',
    },
    required: true,
    default: '',
    displayOptions: { show: { operation: ['moverNegocio'] } },
    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Validate Status Availables',
    name: 'validateStatusAvailable',
    type: 'boolean',
    default: false,
    displayOptions: { show: { operation: ['moverNegocio'] } },
    description: 'Whether to validate if the status is available',
  }
];
