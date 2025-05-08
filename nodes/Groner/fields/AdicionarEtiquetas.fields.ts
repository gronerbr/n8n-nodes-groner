import { NodePropertyTypes } from 'n8n-workflow';

export const adicionarEtiquetasFields = [
	{
		displayName: 'ID Do Negócio',
		name: 'id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['adicionarEtiquetas'] } },
	},
	{
		displayName: 'Etiquetas (JSON)',
		name: 'etiquetas',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		description: 'JSON com as etiquetas a serem adicionadas',
		displayOptions: { show: { operation: ['adicionarEtiquetas'] } },
	},
];
