import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeAddTags(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const id = this.getNodeParameter('id', i) as string;
	const etiquetas = this.getNodeParameter('etiquetas', i) as string[];
	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/projeto/AlterarEtiquetas/${id}`;

	const options = {
		method: 'POST' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		body: etiquetas,
		json: true,
	};

	await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
	return { success: true };
}
