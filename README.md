# Library Api

Projeto proposto para o desenvolvimento técnico em Api com o intuito desse projeto ser uma livraria de artigos onde poderá cadastra Usuários que poderão cadastra e listar autores e artigos dependo do seu nível de acesso na api


## Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

* NPM
* Node 16
* Banco de Dados PostgreSQL
* Docker

### Instalação

Clone este repositório usando o comando:
```bash
$ git clone https://github.com/carlosjeff/library-api.git

```
Na pasta do projeto instale as dependências com uso do npm
```bash
$ npm install

```
No arquivo [.env](https://github.com/carlosjeff/people-crud-api/blob/main/.env) edite os dados de conexão com o banco de dados:
```
DATABASE_HOST="Host do banco de dados"
DATABASE_PORT="Porta do banco de dados"
DATABASE_NAME="Nome do banco de dados"
DATABASE_USER="Usuário do banco de dados"
DATABASE_PASSWORD="Senha do banco de dados"
```

Para que a aplicação crie as tabelas no banco de dados é preciso que synchronize esteja true no arquivo
[src/app.module.ts](https://github.com/carlosjeff/people-crud-api/blob/main/src/app.module.ts):

```javascript
# Essa configuração não deve ser usada na produção - caso contrário, você poderá perder dados.

 TypeOrmModule.forRoot({
      synchronize: true
    })
```

Para iniciar o servidor é só usar o comando na pasta do projeto:
```bash
$ npm run start

```


Para iniciar o servidor Usando o Docker
```bash

# Development 
$ docker compose up dev 
	
# Production
$ docker compose up prod 

```

Você deve obter uma resposta com os endpoints disponíveis:

``` json
    {
    }
```

## Construído com

* [NestJS](https://nestjs.com/) - Framework JavaScript
* [TypeORM](https://typeorm.io/) - Object-Relational Mapping (ORM)

## Autor

* **Carlos Jefferson Braga Alves** - [LinkedIn ](https://www.linkedin.com/in/carlosjeff/)


## Licença

Este projeto está sob a licença MIT License - veja o arquivo [LICENSE.md](https://github.com/carlosjeff/library-api/blob/main/LICENSE.md) para detalhes.
