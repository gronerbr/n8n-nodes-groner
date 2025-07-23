import type { ILoadOptionsFunctions } from 'n8n-workflow';

export async function getTaskStatuses(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
	const credentials = await this.getCredentials('gronerApi');
	const tenant = credentials.tenant as string;

	const url = `https://${tenant}.api.groner.app/api/statusTarefa`;

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

	const response = await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);

	const statuses = response?.Content?.list || [];

	return statuses.map((status: any) => ({
		name: status.nome,
		value: status.id.toString(),
	}));
}
