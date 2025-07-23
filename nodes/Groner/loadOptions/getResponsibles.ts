import type { ILoadOptionsFunctions } from 'n8n-workflow';

export async function getResponsibles(this: ILoadOptionsFunctions) {
	const credentials = await this.getCredentials('gronerApi');
	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/usuario/listaativossimples`;

	const options = {
		method: 'GET' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		qs: {
			query: '',
		},
		json: true,
	};

	const response = await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);

	return (response.Content || []).map((item: { id: string, nome: string }) => ({
		name: item.nome,
		value: item.id,
	}));
}
