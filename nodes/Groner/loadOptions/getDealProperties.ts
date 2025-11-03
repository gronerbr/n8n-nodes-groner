import type { ILoadOptionsFunctions } from 'n8n-workflow';

export async function getDealProperties(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
	const credentials = await this.getCredentials('gronerApi');
	const tenant = credentials.tenant as string;

	const url = `https://${tenant}.api.groner.app/api/Projeto/Propriedades`;

	const options = {
		method: 'GET' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json, text/plain, */*',
		},
		json: true,
	};

    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'gronerApi', options);

	const propriedades = response?.Content || [];

	return propriedades.map((propriedade: string) => ({
		name: propriedade,
		value: propriedade,
	}));
}
