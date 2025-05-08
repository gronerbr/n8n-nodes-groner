import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { editarNegocioPorPropriedadeFields } from '../fields/EditarNegocioPorPropriedade.fields';
import { NodeOperationError } from 'n8n-workflow';

export const editarNegocioPorPropriedadeDescription = [
	...editarNegocioPorPropriedadeFields,
];

export async function executeEditarNegocioPorPropriedade(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const id = this.getNodeParameter('id', i) as string;
			const propriedade = this.getNodeParameter('propriedade', i) as string;
			const valor = this.getNodeParameter('valor', i) as string;
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/projeto/${id}`;
			const options = {
				method: 'PUT' as 'PUT',
				url,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ propriedade, valor }),
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
