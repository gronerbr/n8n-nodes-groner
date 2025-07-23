import type { INodeProperties } from 'n8n-workflow';

export const getDealQuoteFields: INodeProperties[] = [
  {
    displayName: 'Project ID',
    name: 'projetoId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { operation: ['obterOrcamentoNegocio'] } },
    description: 'ID do projeto/negócio',
  },
];
