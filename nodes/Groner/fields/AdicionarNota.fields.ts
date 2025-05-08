import { NodePropertyTypes } from 'n8n-workflow';

export const adicionarNotaFields = [
	{
		displayName: 'ID Do Negócio',
		name: 'id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['adicionarNota'] } },
	},
	{
		displayName: 'Ocorrência',
		name: 'ocorrencia',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['adicionarNota'] } },
	},
	{
		displayName: 'Marcações',
		name: 'marcacoes',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['adicionarNota'] } },
	},
];
