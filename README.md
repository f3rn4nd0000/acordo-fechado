## ACORDO-FECHADO: Cadastro de livros  

### Descrição:

Minha solução para o teste técnico da empresa Acordo Fechado

* * *  

### Stack usada:

 Express (Backend)
 
 Mongoose (ODM Para MongoDB) (Banco de dados)
 
 Swagger (Documentação)

  * * * 
### O que o software faz?
Cadastra livros de acordo contendo os dados pedidos na descrição seguinte o schema:
``` 
{
title:  String,
author:  String,
publisher:  String,
publicationYear:  Number,
numberOfPages:  Number,
},
```
#### Quais validações são feitas?
* O software valida os campos de ano de publicação e número de páginas para garantir que não sejam gerados livros com um ano com menos de 4 dígitos, além de impedir que sejam registrados outros caracteres que não sejam números no ano de publicação.
* Também valida se o número digitado for negativo tanto para ano de publicação quanto para número de páginas.

* * *

### Como Testar:
Antes de testar a aplicação configure o .env com o username e password do seu banco de dados mongoDB

### Exemplo de .env:

MONGO_LOGIN=<seu_login_mongobd>

MONGO_PSSWD=<sua_senha_mongodb>

### Rotas:
* Para ler a documentação use:
* <base_url>/api-docs
#### Todas as outras rotas seguem a configuração
* <base_url>/api/books/
OU
* <base_url>/api/books/:book_id
Onde :book_id é uma string no formato UUID

### Instruções para execução:

É necessário ter o ambiente de execução NodeJS instalado em sua máquina, caso ainda não tenha baixe em: https://nodejs.org/en/download/

Para executar basta fazer um clone do projeto no seu computador:

``` 
git clone https://github.com/f3rn4nd0000/acordo-fechado.git 
```

Após isso, entre no diretório do projeto, instale as dependências e execute comando para iniciar o programa:

```
cd acordo-fechado
npm install
npm start
```
