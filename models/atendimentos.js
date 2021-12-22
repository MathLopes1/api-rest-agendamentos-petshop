//Arquivo responsável pela conexão com o banco de dados
const moment = require('moment') //Biblioteca para trabalhar com datas
const conexao = require('../infraestrutura/conexao')

//Classe com os metodos para ações da API na nossa base de dados do MySQL
class Atendimento{
  //Metodo para Adicionar informações na tabela atendimentos
   adiciona(atendimento){
        //Tratando as datas
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, dataCriacao, data}
        //Criando Query e enviando para conexão
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query (sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
            console.log(erro)
          } else {
            console.log(resultados)
          }
     })
   } 
}

module.exports = new Atendimento
