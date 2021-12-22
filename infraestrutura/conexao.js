//Arquivo responsavel pela conexão com o MySql
const mysql = require('mysql2')
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'matheus86063446@',
    database: 'agenda-petshop'
})

//exportando conexão para outros modulos
module.exports = conexao