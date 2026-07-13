const { Client } = require('pg');
require('dotenv').config();

const banco = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false 
  }
});



banco.connect().then(() => {

  console.log('Conectado ao banco de dados na AWS com sucesso\n');
}).catch((erro) => {
  console.log('Erro na conexão ao bando de dados na AWS', erro.message);
});

module.exports = banco;



