import type { ILoadOptionsFunctions } from 'n8n-workflow';

export async function getDealTypes(this: ILoadOptionsFunctions) {
	const credentials = await this.getCredentials('gronerApi');
	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/tipoProjeto`;

	const options = {
		method: 'GET' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		qs: {
			pageSize: 500,
		},
		json: true,
	};

    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', options);

	return (response.Content?.list || []).map((item: { id: string, nome: string }) => ({
		name: item.nome,
		value: item.id,
	}));
}
