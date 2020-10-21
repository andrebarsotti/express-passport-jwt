const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const faker = require('faker');
const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const shortid = require('shortid');


faker.locale = 'pt_BR';
const senhaPadrao = 'Teste123'

function encriptarSenha(senha, chave) {
  return crypto.createHmac('sha256', chave)
             .update(senha)
             .digest('base64');
}

function gerarUsuario() {
  const chave = cryptoRandomString({length: 32, type: 'base64'});
  const nome = faker.name.firstName();
  const sobrenome = faker.name.lastName();
  return {
    id: shortid.generate(),
    userId: faker.internet.userName(nome, sobrenome),
    name: `${nome} ${sobrenome}`,
    email: faker.internet.email(nome, sobrenome),
    chave: chave,
    senha: encriptarSenha(senhaPadrao, chave)
  }
}

const adapter = new FileSync('db.json');
const db = lowdb(adapter);

db.defaults({ usuarios : [] })
  .write();

for (let index = 0; index < 10; index++) {
    db.get('usuarios')
      .push(gerarUsuario())
      .write();
}