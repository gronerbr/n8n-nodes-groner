import type { IExecuteFunctions, INodeExecutionData, ILoadOptionsFunctions } from 'n8n-workflow';
import { moverNegocioFields } from '../fields/MoverNegocio.fields';
import { NodeOperationError } from 'n8n-workflow';

export const moverNegocioDescription = [
	...moverNegocioFields,
];

export async function executeMoverNegocio(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const id = this.getNodeParameter('id', i) as string;
			const statusId = this.getNodeParameter('statusId', i) as string;
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/projeto/adicionarStatus/${id}`;
			const options = {
				method: 'POST' as 'POST',
				url,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ statusId }),
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
