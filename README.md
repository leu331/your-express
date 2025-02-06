# Your-Express API

## Descrição

A **Your-Express API** é uma aplicação backend simples construída com **Node.js**, **TypeScript**, **Prisma** e **Jest**, voltada para o gerenciamento de um sistema de entregas. Utiliza **Zod** para validação de dados e **Insomnia** para teste das rotas. A API oferece funcionalidades de cadastro de usuários e produtos, pedidos, autenticação e autorização, e testes automatizados.

## Tecnologias

- **Node.js** & **TypeScript**
- **Prisma** (ORM)
- **Jest** (Testes)
- **Zod** (Validação de Dados)
- **Insomnia** (Teste das Rotas)
- **Docker** (Containerização)

/src
  /controllers      # Lógica das rotas
  /middlewares      #autenticações, autorizações e tartamento de possíveis erros
  /routes           # Definição das rotas
  /utils            # Funções auxiliares
  /tests            # Testes automatizados com Jest
/prisma
  /migrations       # Migrations do Prisma
  /schema.prisma    # Definição do schema do banco de dados

O que aprendi:

Aprendi a integrar e configurar o Jest para testes automatizados no meu projeto, garantindo a qualidade e a confiabilidade do código;

Aprendi a realizar a configuração do ambiente de testes, criar testes unitários e de integração, e a validar as respostas da API;

Explorei o uso de Docker para containerização da aplicação, facilitando o deploy e a execução da API de maneira isolada;

Melhorei minhas habilidades em Prisma para o gerenciamento do banco de dados, incluindo a criação e aplicação de migrações;

Trabalhei com Zod para a validação de dados de entrada, garantindo que as informações processadas pela API sejam sempre corretas e seguras.
