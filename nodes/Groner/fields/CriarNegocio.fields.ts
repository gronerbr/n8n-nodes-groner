import { NodePropertyTypes } from 'n8n-workflow';

export const criarNegocioFields = [
	{
		displayName: 'Nome',
		name: 'nome',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Endereço De Email',
		name: 'email',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Telefone',
		name: 'telefone',
		type: 'string' as NodePropertyTypes,
		required: true,
		default: '',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Cidade',
		name: 'cidade',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Documento (Cpf Ou Cnpj)',
		name: 'documento',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Tipo De Pessoa (Pf Ou Pj)',
		name: 'tipoPessoa',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Uf',
		name: 'uf',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Valor Da Conta',
		name: 'valorConta',
		type: 'number' as NodePropertyTypes,
		default: 0,
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Código De Origem',
		name: 'codOrigem',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'ID Do Responsável',
		name: 'responsavelId',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Email Do Responsável',
		name: 'emailResponsavel',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Nota',
		name: 'nota',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Url',
		name: 'url',
		type: 'string' as NodePropertyTypes,
		default: '',
		placeholder: 'https://',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Conjunto De Anúncios',
		name: 'conjuntoAnuncios',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Campanha',
		name: 'campanha',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Anúncio',
		name: 'anuncio',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Codigo De Lead Tracking',
		name: 'codigoLeadTracking',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Nome Fantasia',
		name: 'nomeFantasia',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Segmento',
		name: 'segmento',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
	{
		displayName: 'Tipo De Negócio',
		name: 'tipoProjetoId',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				operation: ['criarNegocio'],
			},
		},
	},
];
