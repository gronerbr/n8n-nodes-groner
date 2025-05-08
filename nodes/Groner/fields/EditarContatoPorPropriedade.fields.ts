import { NodePropertyTypes } from 'n8n-workflow';

export const editarContatoPorPropriedadeFields = [
	{
		displayName: 'ID Do Lead',
		name: 'id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['editarContatoPorPropriedade'] } },
	},
	{
		displayName: 'Propriedade',
		name: 'propriedade',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['editarContatoPorPropriedade'] } },
	},
	{
		displayName: 'Valor',
		name: 'valor',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['editarContatoPorPropriedade'] } },
	},
];
