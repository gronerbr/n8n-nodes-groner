import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeCreateDeal(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const codOrigem = this.getNodeParameter('codOrigem', i, '');
	const customUrlRaw = this.getNodeParameter('url', i, '');
	const customUrl = typeof customUrlRaw === 'string' ? customUrlRaw : '';
	const body: Record<string, any> = {
		name: this.getNodeParameter('nome', i),
		email: this.getNodeParameter('email', i),
		phone: this.getNodeParameter('telefone', i),
		city: this.getNodeParameter('cidade', i, ''),
		document: this.getNodeParameter('documento', i, ''),
		personType: this.getNodeParameter('tipoPessoa', i, ''),
		state: this.getNodeParameter('uf', i, ''),
		accountValue: this.getNodeParameter('valorConta', i, ''),
		responsibleId: this.getNodeParameter('responsavelId', i, ''),
		responsibleEmail: this.getNodeParameter('emailResponsavel', i, ''),
		note: this.getNodeParameter('nota', i, ''),
		campaign: this.getNodeParameter('campanha', i, ''),
		ad: this.getNodeParameter('anuncio', i, ''),
		adSet: this.getNodeParameter('conjuntoAnuncios', i, ''),
		leadTrackingCode: this.getNodeParameter('codigoLeadTracking', i, ''),
		tradeName: this.getNodeParameter('nomeFantasia', i, ''),
		segment: this.getNodeParameter('segmento', i, ''),
		dealType: this.getNodeParameter('tipoProjetoId', i, ''),
	};
	Object.keys(body).forEach(key => (body[key] === '' || body[key] === undefined) && delete body[key]);
	if (body.url !== undefined) {
		delete body.url;
	}
	const tenant = credentials.tenant;
	const url = customUrl && customUrl.trim() !== ''
		? customUrl.trim()
		: `https://${tenant}.api.groner.app/api/lead/FluentForm/${codOrigem}`;
	const options = {
		method: 'POST' as const,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		form: body,
		json: false,
		url,
	};
	return await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
}
