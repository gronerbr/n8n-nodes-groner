import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { pesquisarNegociosFields } from '../fields/PesquisarNegocios.fields';
import { NodeOperationError } from 'n8n-workflow';

export const pesquisarNegociosDescription = [
	...pesquisarNegociosFields,
];

export async function executePesquisarNegocios(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const qs: Record<string, any> = {};
			for (const field of pesquisarNegociosFields) {
				const value = this.getNodeParameter(field.name, i, '');
				if (value !== '' && value !== undefined) qs[field.name] = value;
			}
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/projeto/cards`;
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
			const list = responseData?.Content?.list ?? [];
			if (Array.isArray(list)) {
				for (const item of list) {
					returnData.push({ json: item });
				}
			}
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
