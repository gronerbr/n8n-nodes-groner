import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeSendWhatsApp(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const body: Record<string, any> = {};

	// Lista de todos os campos disponíveis
	const fields = [
		'leadId', 'mensagem', 'celular', 'urlImagem', 'urlAudio', 'urlVideo', 'urlDocumento',
		'preVendedor', 'vendedor', 'tecnico', 'lead'
	];

	// Adiciona apenas campos que têm valor
	for (const field of fields) {
		const value = this.getNodeParameter(field, i, '');
		if (value !== '' && value !== undefined && value !== null && value !== false) {
			body[field] = value;
		}
	}

	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/WhatsApp/enviarMensagem`;

	const options = {
		method: 'POST' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		body,
		json: true,
	};

	return await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
}
