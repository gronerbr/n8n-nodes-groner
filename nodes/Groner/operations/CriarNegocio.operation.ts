import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { criarNegocioFields } from '../fields/CriarNegocio.fields';
import { NodeOperationError } from 'n8n-workflow';

export const criarNegocioDescription = [
	...criarNegocioFields,
];

export async function executeCriarNegocio(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
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
				: `https://${tenant}.api.groner.app/api/lead/FluentForm/${codOrigem}`;

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
