import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { adicionarNotaFields } from '../fields/AdicionarNota.fields';
import { NodeOperationError } from 'n8n-workflow';

export const adicionarNotaDescription = [
	...adicionarNotaFields,
];

export async function executeAdicionarNota(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const id = this.getNodeParameter('id', i) as string;
			const ocorrencia = this.getNodeParameter('ocorrencia', i) as string;
			const marcacoes = this.getNodeParameter('marcacoes', i) as string;
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/projeto/adicionarocorrencia/${id}`;
			const options = {
				method: 'POST' as 'POST',
				url,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ocorrencia, marcacoes }),
				json: false,
			};
			await this.helpers.request(options);
			returnData.push({ json: { success: true } });
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: error.message }, pairedItem: i });
			} else {
				throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
			}
		}
	}
	return [returnData];
}
