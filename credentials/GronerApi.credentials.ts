import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class GronerApi implements ICredentialType {
	name = 'gronerApi';
	displayName = 'Groner API';
	documentationUrl = 'https://docs.groner.app';
	properties: INodeProperties[] = [
		{
			displayName: 'Subdomain',
			name: 'tenant',
			type: 'string',
			default: '',
			placeholder: 'comercial',
			description: 'Your Groner subdomain (e.g., comercial, minhaempresa)',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Groner API key (JWT token)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{ "Bearer " + $credentials.apiKey }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: '={{ "https://" + $credentials.tenant + ".api.groner.app/api/conta/minhaconta" }}',
		},
	};
}
