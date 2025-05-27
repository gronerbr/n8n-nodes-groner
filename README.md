![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-groner

Este repositório contém nodes customizados para integração do n8n com a API Groner (CRM Solar).

---

## Node principal

- **Groner**: Node principal para integração com a API Groner, cobrindo todas as principais operações de CRM.

## Operações disponíveis

| Operação                        | Descrição                                                                                 |
|---------------------------------|------------------------------------------------------------------------------------------|
| Criar Negócio                   | Cria um novo negócio (lead/projeto) no Groner.                                            |
| Pesquisar Negócios              | Busca negócios (projetos) com filtros avançados e paginação.                              |
| Adicionar Etiquetas             | Adiciona etiquetas (tags) a um negócio existente.                                         |
| Adicionar Nota                  | Adiciona uma nota/ocorrência a um negócio.                                                |
| Adicionar Tarefa                | Cria uma nova tarefa vinculada a um negócio.                                              |
| Editar Contato Por Propriedade  | Edita propriedades de um contato (lead) existente.                                        |
| Editar Negócio Por Propriedade  | Edita propriedades de um negócio (projeto) existente.                                     |
| Enviar Mensagem WhatsApp        | Envia mensagem WhatsApp para um lead/contato via Groner.                                  |
| Mover Negócio                   | Altera o status/etapa de um negócio.                                                      |
| Obter Orçamento Do Negócio      | Busca orçamentos vinculados a um negócio.                                                 |
| Pesquisar Tarefas               | Busca tarefas com filtros avançados.                                                      |

---

## Pré-requisitos

Você precisa ter instalado em sua máquina de desenvolvimento:

- [git](https://git-scm.com/downloads)
- Node.js e pnpm (Node 18 ou superior)
- n8n instalado globalmente:
  ```
  pnpm install n8n -g
  ```

## Instalação

1. Clone este repositório:
   ```
   git clone https://github.com/<sua-organizacao>/n8n-nodes-groner.git
   ```
2. Instale as dependências:
   ```
   pnpm install
   ```
3. Abra o projeto no seu editor de código.
4. Rode o build para copiar os ícones:
   ```
   pnpm build
   ```

## Configuração de Credenciais

1. No n8n, adicione uma nova credencial do tipo **Groner API**.
2. Preencha os campos:
   - **Tenant**: Seu subdomínio Groner (ex: `minhaempresa`)
   - **API Key**: Sua chave de API Groner

---

## Como usar o node Groner

1. Adicione o node **Groner** ao seu workflow.
2. Escolha a operação desejada no campo "Operation".
3. Preencha os campos obrigatórios e opcionais conforme necessário para a operação escolhida.
4. Execute o workflow. O retorno da API será disponibilizado como saída do node, um item por registro retornado (quando aplicável).

### Exemplos de uso e payloads

#### Criar Negócio
- **Campos principais:** nome, email, telefone, cidade, documento, tipoPessoa, etc.
- **Exemplo de uso:**
  - Escolha "Criar Negócio" em Operation.
  - Preencha os dados do lead/negócio.
  - Execute para criar um novo registro no Groner.

#### Pesquisar Negócios
- **Campos de filtro:** etapaId, pageNumber, pageSize, query, etiquetasIds, vendedorResponsavelId, etc.
- **Exemplo de uso:**
  - Escolha "Pesquisar Negócios".
  - Preencha filtros conforme desejado (ex: etapaId, pageSize).
  - O node retorna cada negócio encontrado como um item individual.

#### Adicionar Etiquetas
- **Campos:** id (ID do negócio), etiquetas (JSON de etiquetas)
- **Exemplo de uso:**
  - Escolha "Adicionar Etiquetas".
  - Informe o ID do negócio e as etiquetas (ex: `["VIP","Solar"]`).

#### Adicionar Nota
- **Campos:** id (ID do negócio), ocorrencia, marcacoes
- **Exemplo de uso:**
  - Escolha "Adicionar Nota".
  - Preencha o ID do negócio, a ocorrência e marcações.

#### Adicionar Tarefa
- **Campos:** titulo, descricao, tipoId, statusId, projetoId, usuariosIds, datas, etc.
- **Exemplo de uso:**
  - Escolha "Adicionar Tarefa".
  - Preencha os campos obrigatórios e execute.

#### Editar Contato Por Propriedade
- **Campos:** id (ID do lead), propriedade, valor
- **Exemplo de uso:**
  - Escolha "Editar Contato Por Propriedade".
  - Informe o ID do lead, a propriedade a editar e o novo valor.

#### Editar Negócio Por Propriedade
- **Campos:** id (ID do negócio), propriedade, valor
- **Exemplo de uso:**
  - Escolha "Editar Negócio Por Propriedade".
  - Informe o ID do negócio, a propriedade a editar e o novo valor.

#### Enviar Mensagem WhatsApp
- **Campos:** leadId, mensagem, preVendedor, vendedor, tecnico, celular, urlImagem, urlAudio, urlVideo, urlDocumento
- **Exemplo de uso:**
  - Escolha "Enviar Mensagem WhatsApp".
  - Preencha os campos necessários para envio da mensagem.

#### Mover Negócio
- **Campos:** id (ID do negócio), statusId (novo status)
- **Exemplo de uso:**
  - Escolha "Mover Negócio".
  - Informe o ID do negócio e o novo status.

#### Obter Orçamento Do Negócio
- **Campos:** projetoId
- **Exemplo de uso:**
  - Escolha "Obter Orçamento Do Negócio".
  - Informe o ID do projeto/negócio.

#### Pesquisar Tarefas
- **Campos de filtro:** leadId, projetoId, tipoId, pageNumber, pageSize, query, usuarioId, lojasIds, statusId, ordenarPor
- **Exemplo de uso:**
  - Escolha "Pesquisar Tarefas".
  - Preencha filtros conforme desejado.

---

## Observações importantes

- **Saída dos nodes:** Para operações de busca, cada item retornado pela API será um item individual na saída do node n8n.
- **Erros:** Se a API retornar erro, a mensagem será exibida no painel de execução do node.
- **Ícone customizado:** O node exibe o ícone do Groner se o arquivo `logogroner.svg` estiver presente na pasta do node.

---

## Scripts úteis

- `pnpm lint` — Verifica problemas de lint no projeto
- `pnpm lintfix` — Corrige automaticamente problemas de lint
- `pnpm build` — Compila o projeto e copia os ícones

## Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para abrir issues ou sugerir melhorias.

## Licença

[MIT](LICENSE.md)
