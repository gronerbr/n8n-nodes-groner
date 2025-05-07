import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class GronerLeadFluentForm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Groner Lead FluentForm',
		name: 'gronerLeadFluentForm',
		group: ['transform'],
		version: 1,
		description: 'Envia lead para o endpoint FluentForm da Groner',
		defaults: {
			name: 'Groner Lead FluentForm',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'gronerApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Nome',
				name: 'nome',
				type: 'string',
				required: true,
				default: '',
			},
			{
				displayName: 'Endereço De Email',
				name: 'email',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'name@email.com',
			},
			{
				displayName: 'Telefone',
				name: 'telefone',
				type: 'string',
				required: true,
				default: '',
				placeholder: '',
			},
			{
				displayName: 'Cidade',
				name: 'cidade',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Documento (Cpf Ou Cnpj)',
				name: 'documento',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Tipo De Pessoa (Pf Ou Pj)',
				name: 'tipoPessoa',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Uf',
				name: 'uf',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Valor Da Conta',
				name: 'valorConta',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Código De Origem',
				name: 'codOrigem',
				type: 'string',
				default: '',
			},
			{
				displayName: 'ID Do Responsável',
				name: 'responsavelId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Email Do Responsável',
				name: 'emailResponsavel',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
			},
			{
				displayName: 'Nota',
				name: 'nota',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Url',
				name: 'url',
				type: 'string',
				default: '',
				placeholder: 'https://',
			},
			{
				displayName: 'Conjunto De Anúncios',
				name: 'conjuntoAnuncios',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Campanha',
				name: 'campanha',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Anúncio',
				name: 'anuncio',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Codigo De Lead Tracking',
				name: 'codigoLeadTracking',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Nome Fantasia',
				name: 'nomeFantasia',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Segmento',
				name: 'segmento',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Tipo De Negócio',
				name: 'tipoProjetoId',
				type: 'string',
				default: '',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('gronerApi');

		for (let i = 0; i < items.length; i++) {
			try {
				const codOrigem = this.getNodeParameter('codOrigem', i, '');
				const customUrlRaw = this.getNodeParameter('url', i, '');
				const customUrl = typeof customUrlRaw === 'string' ? customUrlRaw : '';
				const body: Record<string, any> = {
					nome: this.getNodeParameter('nome', i),
					email: this.getNodeParameter('email', i),
					telefone: this.getNodeParameter('telefone', i),
					cidade: this.getNodeParameter('cidade', i, ''),
					documento: this.getNodeParameter('documento', i, ''),
					tipoPessoa: this.getNodeParameter('tipoPessoa', i, ''),
					uf: this.getNodeParameter('uf', i, ''),
					valorConta: this.getNodeParameter('valorConta', i, ''),
					responsavelId: this.getNodeParameter('responsavelId', i, ''),
					emailResponsavel: this.getNodeParameter('emailResponsavel', i, ''),
					nota: this.getNodeParameter('nota', i, ''),
					campanha: this.getNodeParameter('campanha', i, ''),
					anuncio: this.getNodeParameter('anuncio', i, ''),
					conjuntoAnuncios: this.getNodeParameter('conjuntoAnuncios', i, ''),
					codigoLeadTracking: this.getNodeParameter('codigoLeadTracking', i, ''),
					nomeFantasia: this.getNodeParameter('nomeFantasia', i, ''),
					segmento: this.getNodeParameter('segmento', i, ''),
					tipoProjetoId: this.getNodeParameter('tipoProjetoId', i, ''),
				};

				// Remove campos vazios
				Object.keys(body).forEach(key => (body[key] === '' || body[key] === undefined) && delete body[key]);
				// Não enviar o campo 'url' no corpo
				if (body.url !== undefined) {
					delete body.url;
				}

				const tenant = credentials.tenant;
				const apiKey = credentials.apiKey;
				const url = customUrl && customUrl.trim() !== ''
					? customUrl.trim()
					: `https://${tenant}.api.groner.app/lead/FluentForm/${codOrigem}`;

				const options = {
					method: 'POST' as 'POST',
					headers: {
						'Authorization': `Bearer ${apiKey}`,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					form: body,
					json: false,
					url,
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
}
