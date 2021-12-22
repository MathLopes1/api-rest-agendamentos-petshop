//Arquivo responsável pela conexão com o banco de dados
const conexao = require('../infraestrutura/conexao')

//Classe com os metodos para ações da API na nossa base de dados do MySQL
class Atendimento{
  //Metodo para Adicionar informações na tabela atendimentos
   adiciona(atendimento){
        //Criando Query e enviando para conexão
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query (sql, atendimento, (erro, resultados) => {
            if(erro){
            console.log(erro)
          } else {
            console.log(resultados)
          }
     })
   } 
}

module.exports = new Atendimento
