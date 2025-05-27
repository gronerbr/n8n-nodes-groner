import type { ILoadOptionsFunctions } from 'n8n-workflow';

export async function getStatuses(this: ILoadOptionsFunctions) {
	const credentials = await this.getCredentials('gronerApi');
	const tenant = credentials.tenant;
	const apiKey = credentials.apiKey;
	const url = `https://${tenant}.api.groner.app/api/projeto/statusProjeto`;

	const qs = {
		pageSize: 500,
		query: '',
	};

	const options = {
		method: 'GET' as const,
		url,
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		qs,
		json: true,
	};

	const response = await this.helpers.request(options);

	return (response.Content.list || []).map((item: { id: string, nome: string }) => ({
		name: item.nome,
		value: item.id,
	}));
}
