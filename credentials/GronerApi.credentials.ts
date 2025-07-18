import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
	IAuthenticateGeneric,
} from 'n8n-workflow';

export class GronerApi implements ICredentialType {
	name = 'gronerApi';
	displayName = 'Groner API';
	properties: INodeProperties[] = [
		{
			displayName: 'Tenant',
			name: 'tenant',
			type: 'string',
			default: '',
			placeholder: 'exemplo-empresa',
			description: 'Your Groner subdomain (tenant)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Groner API key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: 'Bearer {{ $credentials.apiKey }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: '={{ "https://" + $credentials.tenant + ".api.groner.app/api/conta/minhaconta" }}',
			headers: {
				Authorization: 'Bearer {{ $credentials.apiKey }}',
			},
		},
	};

	// credentialLabel: '={{ $response.body.email }}', // Descomente se sua versão do n8n suportar
}
