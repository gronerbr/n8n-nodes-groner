import type { INodeProperties } from 'n8n-workflow';

export const addNoteFields: INodeProperties[] = [
  {
    displayName: 'Deal ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['adicionarNota'] } },
  },
  {
    displayName: 'Occurrence',
    name: 'ocorrencia',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['adicionarNota'] } },
    description: 'Occurrence/note text',
  },
  {
    displayName: 'Mentions',
    name: 'marcacoes',
    type: 'string',
    default: '',
    displayOptions: { show: { operation: ['adicionarNota'] } },
    description: 'Mentions/tags',
  },
];
