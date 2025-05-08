import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { adicionarTarefaFields } from '../fields/AdicionarTarefa.fields';
import { NodeOperationError } from 'n8n-workflow';

export const adicionarTarefaDescription = [
	...adicionarTarefaFields,
];

export async function executeAdicionarTarefa(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const body: Record<string, any> = {};
			for (const field of adicionarTarefaFields) {
				const value = this.getNodeParameter(field.name, i, '');
				if (value !== '' && value !== undefined) body[field.name] = value;
			}
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/tarefa`;
			const options = {
				method: 'POST' as 'POST',
				url,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify(body),
				json: false,
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
