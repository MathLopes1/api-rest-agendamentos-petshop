//Arquivo responsável pela conexão com o banco de dados
const moment = require('moment') //Biblioteca para trabalhar com datas
const conexao = require('../infraestrutura/conexao')

//Classe com os metodos para ações da API na nossa base de dados do MySQL
class Atendimento {
  //Metodo para Adicionar informações na tabela atendimentos
  adiciona(atendimento, res) {
    //Tratando as datas
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')


    //Validando data. Saber se data informada é menor que a data de criação
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
    //Validando nome do cliente no body de atendimento.
    const clienteEhValido = atendimento.cliente.length >= 5

    //Array de objetos para receber o resultado das validações
    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]

    //Constante erros que filtra o array de validações no campo "valido" para conferir se o valor é true or false
    const erros = validacoes.filter(campo => !campo.valido)
    //Constante que vai capitar se a variavel erros guardou algum valor, pois ela só era armazenar caso seja false
    const existemErros = erros.length

    if (existemErros) {
      res.status(400).json(erros)
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data }

      //Criando Query e enviando para conexão
      const sql = 'INSERT INTO Atendimentos SET ?'

      //Adicionando status http junto com a resposta vinda da rota
      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro)
        } else {
          res.status(201).json(resultados)
        }

      })
    }
  }

  //Metodo de listar exportado para o GET de informações gerais
  lista(res) {
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }
  //Metodo para buscar uma informação com id específico
  buscarPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0]
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(atendimento)
      }
    })
  }

  //Metodo para alterar informações utilizado no PATH
  altera(id, valores, res) {
    //Caso o valor venha com uma data para alteração, através desse if mudamos a data para o formato aceitavel
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }

    //const sql recebendo a  query de atualização
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

    //executamos a query recebendo os valores das ? através de um array, e testamos se há algum erro
    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }

}

module.exports = new Atendimento
