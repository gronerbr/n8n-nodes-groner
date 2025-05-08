import { NodePropertyTypes } from 'n8n-workflow';

export const obterOrcamentoNegocioFields = [
	{
		displayName: 'Projeto ID',
		name: 'projetoId',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['obterOrcamentoNegocio'] } },
	},
];
