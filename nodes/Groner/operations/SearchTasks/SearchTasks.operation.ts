import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeSearchTasks(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const qs: Record<string, any> = {};

	// List of all available fields
	const fields = [
		'pageSize', 'query', 'tipoId', 'statusId', 'usuarioId', 'leadId', 'projetoId',
		'lojasIds', 'dataInicial', 'dataFinal', 'ordenarPor'
	];

	// Add only fields that have values
	for (const field of fields) {
		const value = this.getNodeParameter(field, i, '');
		if (value !== '' && value !== undefined && value !== null && value !== 0) {
			// For arrays, convert to comma-separated string
			if (Array.isArray(value)) {
				if (value.length > 0) {
					qs[field] = value.join(',');
				}
			} else {
				qs[field] = value;
			}
		}
	}

	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/tarefa`;

	const options = {
		method: 'GET' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json, text/plain, */*',
		},
		qs,
		json: true,
	};

	const resp = await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
	const list = resp?.Content?.list ?? [];
	return Array.isArray(list) ? list : [resp];
}
