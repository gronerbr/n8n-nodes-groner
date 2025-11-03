import type { ILoadOptionsFunctions } from 'n8n-workflow';

export async function getTaskTypes(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
	const credentials = await this.getCredentials('gronerApi');
	const tenant = credentials.tenant as string;

	const url = `https://${tenant}.api.groner.app/api/tipoTarefa`;

	const options = {
		method: 'GET' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json, text/plain, */*',
		},
		qs: {
			pageSize: 500,
		},
		json: true,
	};

    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', options);

	const tipos = response?.Content?.list || [];

	return tipos.map((tipo: any) => ({
		name: tipo.nome,
		value: tipo.id.toString(),
	}));
}
