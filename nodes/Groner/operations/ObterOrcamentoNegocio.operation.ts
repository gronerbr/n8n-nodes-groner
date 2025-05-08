import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { obterOrcamentoNegocioFields } from '../fields/ObterOrcamentoNegocio.fields';
import { NodeOperationError } from 'n8n-workflow';

export const obterOrcamentoNegocioDescription = [
	...obterOrcamentoNegocioFields,
];

export async function executeObterOrcamentoNegocio(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const projetoId = this.getNodeParameter('projetoId', i) as string;
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/orcamento/unico/${projetoId}?pageSize=5&pageNumber=1`;
			const options = {
				method: 'GET' as 'GET',
				url,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
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
