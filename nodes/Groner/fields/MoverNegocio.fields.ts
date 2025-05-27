import { NodePropertyTypes } from 'n8n-workflow';

export const moverNegocioFields = [
	{
		displayName: 'ID Do Negócio',
		name: 'id',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: { show: { operation: ['moverNegocio'] } },
	},
	{
		displayName: 'Status',
		name: 'statusId',
		type: 'options' as NodePropertyTypes,
		required: true,
		default: '',
		typeOptions: {
			loadOptionsMethod: 'getStatuses',
		},
		displayOptions: { show: { operation: ['moverNegocio'] } },
	},
];
