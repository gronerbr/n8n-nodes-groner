import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeAddTask(this: IExecuteFunctions, i: number, items: INodeExecutionData[], credentials: any): Promise<any> {
	const body: Record<string, any> = {};

	// Campos obrigatórios
	body.titulo = this.getNodeParameter('titulo', i) as string;
	body.tipoId = this.getNodeParameter('tipoId', i) as string;
	body.statusId = this.getNodeParameter('statusTarefaId', i) as string;
	body.projetoId = this.getNodeParameter('projetoId', i) as number;
	body.usuariosIds = this.getNodeParameter('usuariosIds', i) as string[];

	// Campos opcionais
	const descricao = this.getNodeParameter('descricao', i, '') as string;
	if (descricao !== '') body.descricao = descricao;

	const dataInicial = this.getNodeParameter('dataInicial', i, '') as string;
	if (dataInicial !== '') body.dataInicial = dataInicial;

	const dataEntrega = this.getNodeParameter('dataEntrega', i, '') as string;
	if (dataEntrega !== '') body.dataEntrega = dataEntrega;

	const tenant = credentials.tenant;
	const url = `https://${tenant}.api.groner.app/api/tarefa`;

	const options = {
		method: 'POST' as const,
		url,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body,
		json: true,
	};

	return await this.helpers.requestWithAuthentication.call(this, 'gronerApi', options);
}
