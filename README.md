# Estudo de validação Jwt em Express

Para executar o projeto:

No linux:
  ~~~ terminal
  npm i && npm run gerar-db && npm start
  ~~~

No windows:
  ~~~ PowerShell
  npm i
  npm run gerar-db
  npm start
  ~~~

Quando os comandos acima são executados um arquivo *db.json* é gerado na raiz com a lista de usuários.

Utilizando o *PostMan* ou um interface similar:

1. Para obter o token submeta o Json abaixo no *body* da url [http://localhost:8080/login](http://localhost:8080/login)
  ~~~ json
  {
      "userName": "<nome do usuário>",
      "password": "Teste123"
  }
  ~~~

2. Para validar faça um get na página [http://localhost:8080/profile](http://localhost:8080/profile) passando o token com um header *Authorization = Bearer **token***

## Referências

JSCRAMBLER, *API para Autenticar usuários com JWT e Passport*, Acessado em 19-10-2020 [link](https://tableless.com.br/autenticar-usuarios-com-jwt-e-passport/)

PASSPORTJS, *passport-jwt*, Acessado em 19-10-2020 [link](http://www.passportjs.org/packages/passport-jwt/)

EXPRESS, *Exemplo Hello World*, Acessado em 19-10-2020  [link](https://expressjs.com/pt-br/starter/hello-world.html)

TYPICODE, *Lowdb*, Acessado em 19-10-2020  [link](https://github.com/typicode/lowdb)