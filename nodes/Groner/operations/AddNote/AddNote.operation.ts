import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeAddNote(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const id = this.getNodeParameter('id', i) as string;
	const ocorrencia = this.getNodeParameter('ocorrencia', i) as string;
	const marcacoes = this.getNodeParameter('marcacoes', i) as string;
	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/projeto/adicionarocorrencia/${id}`;
	const options = {
		method: 'POST' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ocorrencia, marcacoes }),
		json: false,
	};
	await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
	return { success: true };
}
