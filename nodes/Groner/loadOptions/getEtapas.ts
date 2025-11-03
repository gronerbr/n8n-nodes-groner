import type { ILoadOptionsFunctions } from 'n8n-workflow';

export async function getEtapas(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
	const credentials = await this.getCredentials('gronerApi');
	const tenant = credentials.tenant as string;

	const url = `https://${tenant}.api.groner.app/api/etapaLead`;

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

	const etapas = response?.Content?.list || [];

	return etapas.map((etapa: any) => ({
		name: etapa.nome,
		value: etapa.id.toString(),
	}));
}
