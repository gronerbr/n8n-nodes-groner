import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeGetDealQuote(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const projetoId = this.getNodeParameter('projetoId', i) as string;
	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/orcamento/unico/${projetoId}?pageSize=5&pageNumber=1`;
	const options = {
		method: 'GET' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		json: true,
	};
	return await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
}
