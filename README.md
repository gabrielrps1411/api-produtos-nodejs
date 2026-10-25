# API de Produtos - Node.js

API REST desenvolvida em Node.js para gerenciamento de produtos, com persistência de dados em SQL Server.

## Tecnologias utilizadas

- Node.js
- Express
- SQL Server
- CORS
- Nodemon
- Postman

## Funcionalidades

A API permite:

- Cadastrar produtos
- Listar todos os produtos
- Buscar produto por código
- Buscar produtos por categoria
- Atualizar produtos
- Excluir produtos

## Endpoints

| Método | Endpoint | Função |
|---|---|---|
| GET | / | Verificar funcionamento da API |
| GET | /produtos | Listar produtos |
| GET | /produtos/codigo/:codigo | Buscar produto por código |
| GET | /produtos/categoria/:categoria | Buscar produtos por categoria |
| POST | /produtos | Cadastrar produto |
| PUT | /produtos/:codigo | Atualizar produto |
| DELETE | /produtos/:codigo | Excluir produto |

## Execução

Instale as dependências:

```bash
npm install
