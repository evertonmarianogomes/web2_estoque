[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![PHP License](https://img.shields.io/badge/php-%3E%3D8.1-blue)](https://www.php.net/) [![Version](https://img.shields.io/badge/Version-1.0.1052-lightgrey)](https://github.com/evertonmarianogomes/web2template)
# Web 2 Estoque

Web 2 Estoque (nome provisório) é um projeto com as funções de controle de estoque, vendas e relatórios financeiros.

### Tecnologias utilizadas
* Front-end: React, Bootstrap, React MUI e TypeScript
* Back-end: Laravel e Inertia


## Como usar? [Desenvolvimento]

1. Clone o repositório
2. Instale as dependencias

```bash
$ npm install
```
```bash
$ composer install
```

3. Crie uma cópia do arquivo `.env.example` e o renomeie para `.env` 
    - 3.1 No arquivo `.env` altere os parametros de conexão de banco de dados de acordo com o seu ambiente

4. Rode as migrations com `php artisan migrate:fresh` (Lembre-se de alterar o `.env`)
5. Execute as seeders para inserir dados no BD com `php artisan db:seed`
6. Crie a chave da aplicação com `php artisan key:generate`
7. Execute os comandos para iniciar o servidor de desenvolvimento

```bash
$ npm run dev
```

```bash
$ php artisan serve
```

8. Pronto :)



Leia o arquivo `changelog.md` para lista de alterações