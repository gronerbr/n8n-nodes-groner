![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-groner

Este repositório contém nodes customizados para integração do n8n com a API Groner.

## Nodes disponíveis

- **GronerLeadFluentForm**: Envia leads para o endpoint FluentForm da Groner.

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

## Configuração de Credenciais

1. No n8n, adicione uma nova credencial do tipo **Groner API**.
2. Preencha os campos:
   - **Tenant**: Seu subdomínio Groner (ex: `minhaempresa`)
   - **API Key**: Sua chave de API Groner

## Como usar o node GronerLeadFluentForm

1. Adicione o node **GronerLeadFluentForm** ao seu workflow.
2. Preencha os campos obrigatórios e opcionais conforme necessário:
   - Nome, Email, Telefone, etc.
3. O node irá enviar os dados para o endpoint `/lead/FluentForm/{codOrigem}` da API Groner.
4. O retorno da API será disponibilizado como saída do node.

## Scripts úteis

- `pnpm lint` — Verifica problemas de lint no projeto
- `pnpm lintfix` — Corrige automaticamente problemas de lint

## Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para abrir issues ou sugerir melhorias.

## Licença

[MIT](LICENSE.md)
