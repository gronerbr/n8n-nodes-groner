import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeMoveDeal(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const id = this.getNodeParameter('id', i) as string;
	const statusId = this.getNodeParameter('statusId', i) as string;
	const validateStatusAvailable = this.getNodeParameter('validateStatusAvailable', i) as boolean;
	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/projeto/adicionarStatus/${id}?validaStatusDisponivel=${validateStatusAvailable}`;
	const options = {
		method: 'POST' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ statusId }),
		json: false,
	};
	return await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
}
