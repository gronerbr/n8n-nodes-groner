import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { pesquisarTarefasFields } from '../fields/PesquisarTarefas.fields';
import { NodeOperationError } from 'n8n-workflow';

export const pesquisarTarefasDescription = [
	...pesquisarTarefasFields,
];

export async function executePesquisarTarefas(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const qs: Record<string, any> = {};
			for (const field of pesquisarTarefasFields) {
				const value = this.getNodeParameter(field.name, i, '');
				if (value !== '' && value !== undefined) qs[field.name] = value;
			}
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/tarefa`;
			const options = {
				method: 'GET' as 'GET',
				url,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json, text/plain, */*',
				},
				qs,
				json: true,
			};
			const responseData = await this.helpers.request(options);
			returnData.push({ json: responseData.Content ?? responseData });
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
