import { NodePropertyTypes } from 'n8n-workflow';

export const editarNegocioPorPropriedadeFields = [
	{
		displayName: 'ID Do Negócio',
		name: 'id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['editarNegocioPorPropriedade'] } },
	},
	{
		displayName: 'Propriedade',
		name: 'propriedade',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['editarNegocioPorPropriedade'] } },
	},
	{
		displayName: 'Valor',
		name: 'valor',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['editarNegocioPorPropriedade'] } },
	},
];
