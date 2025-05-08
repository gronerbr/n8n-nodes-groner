import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { enviarMensagemWhatsAppFields } from '../fields/EnviarMensagemWhatsApp.fields';
import { NodeOperationError } from 'n8n-workflow';

export const enviarMensagemWhatsAppDescription = [
	...enviarMensagemWhatsAppFields,
];

export async function executeEnviarMensagemWhatsApp(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('gronerApi');

	for (let i = 0; i < items.length; i++) {
		try {
			const body: Record<string, any> = {};
			for (const field of enviarMensagemWhatsAppFields) {
				const value = this.getNodeParameter(field.name, i, '');
				if (value !== '' && value !== undefined) body[field.name] = value;
			}
			const tenant = credentials.tenant;
			const apiKey = credentials.apiKey;
			const url = `https://${tenant}.api.groner.app/api/WhatsApp/enviarMensagem`;
			const options = {
				method: 'POST' as 'POST',
				url,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
				json: false,
			};
			const responseData = await this.helpers.request(options);
			returnData.push({ json: responseData });
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
