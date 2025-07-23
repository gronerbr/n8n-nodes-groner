import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeEditContact(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const id = this.getNodeParameter('id', i) as number;
	const propriedade = this.getNodeParameter('propriedade', i) as string;
	const valor = this.getNodeParameter('valor', i) as string;

	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/lead/${id}`;

	const options = {
		method: 'PUT' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		body: {
			propriedade,
			valor,
		},
		json: true,
	};

	return await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
}
