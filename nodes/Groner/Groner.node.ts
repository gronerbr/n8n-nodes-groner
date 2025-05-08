import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { criarNegocioDescription, executeCriarNegocio } from './operations/CriarNegocio.operation';
import { pesquisarNegociosDescription, executePesquisarNegocios } from './operations/PesquisarNegocios.operation';
import { adicionarEtiquetasDescription, executeAdicionarEtiquetas } from './operations/AdicionarEtiquetas.operation';
import { adicionarNotaDescription, executeAdicionarNota } from './operations/AdicionarNota.operation';
import { adicionarTarefaDescription, executeAdicionarTarefa } from './operations/AdicionarTarefa.operation';
import { editarContatoPorPropriedadeDescription, executeEditarContatoPorPropriedade } from './operations/EditarContatoPorPropriedade.operation';
import { editarNegocioPorPropriedadeDescription, executeEditarNegocioPorPropriedade } from './operations/EditarNegocioPorPropriedade.operation';
import { enviarMensagemWhatsAppDescription, executeEnviarMensagemWhatsApp } from './operations/EnviarMensagemWhatsApp.operation';
import { moverNegocioDescription, executeMoverNegocio } from './operations/MoverNegocio.operation';
import { obterOrcamentoNegocioDescription, executeObterOrcamentoNegocio } from './operations/ObterOrcamentoNegocio.operation';
import { pesquisarTarefasDescription, executePesquisarTarefas } from './operations/PesquisarTarefas.operation';

export class Groner implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Groner',
		name: 'groner',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Integração com a API Groner',
		icon: 'file:logogroner.svg',
		defaults: {
			name: 'Groner',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'gronerApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Adicionar Etiquetas', value: 'adicionarEtiquetas' },
					{ name: 'Adicionar Nota', value: 'adicionarNota' },
					{ name: 'Adicionar Tarefa', value: 'adicionarTarefa' },
					{ name: 'Criar Negócio', value: 'criarNegocio' },
					{ name: 'Editar Contato Por Propriedade', value: 'editarContatoPorPropriedade' },
					{ name: 'Editar Negócio Por Propriedade', value: 'editarNegocioPorPropriedade' },
					{ name: 'Enviar Mensagem WhatsApp', value: 'enviarMensagemWhatsApp' },
					{ name: 'Mover Negócio', value: 'moverNegocio' },
					{ name: 'Obter Orçamento Do Negócio', value: 'obterOrcamentoNegocio' },
					{ name: 'Pesquisar Negócios', value: 'pesquisarNegocios' },
					{ name: 'Pesquisar Tarefas', value: 'pesquisarTarefas' },
				],
				default: 'criarNegocio',
			},
			...criarNegocioDescription,
			...pesquisarNegociosDescription,
			...adicionarEtiquetasDescription,
			...adicionarNotaDescription,
			...adicionarTarefaDescription,
			...editarContatoPorPropriedadeDescription,
			...editarNegocioPorPropriedadeDescription,
			...enviarMensagemWhatsAppDescription,
			...moverNegocioDescription,
			...obterOrcamentoNegocioDescription,
			...pesquisarTarefasDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('operation', 0) as string;
		switch (operation) {
			case 'criarNegocio':
				return await executeCriarNegocio.call(this);
			case 'pesquisarNegocios':
				return await executePesquisarNegocios.call(this);
			case 'adicionarEtiquetas':
				return await executeAdicionarEtiquetas.call(this);
			case 'adicionarNota':
				return await executeAdicionarNota.call(this);
			case 'adicionarTarefa':
				return await executeAdicionarTarefa.call(this);
			case 'editarContatoPorPropriedade':
				return await executeEditarContatoPorPropriedade.call(this);
			case 'editarNegocioPorPropriedade':
				return await executeEditarNegocioPorPropriedade.call(this);
			case 'enviarMensagemWhatsApp':
				return await executeEnviarMensagemWhatsApp.call(this);
			case 'moverNegocio':
				return await executeMoverNegocio.call(this);
			case 'obterOrcamentoNegocio':
				return await executeObterOrcamentoNegocio.call(this);
			case 'pesquisarTarefas':
				return await executePesquisarTarefas.call(this);
			default:
				throw new NodeOperationError(this.getNode(), `Operação não suportada: ${operation}`);
		}
	}
}
