//Arquivo com responsabilidade de controlar as rotas e difinir o que cada uma tem que fazer
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    //GET para pegar dados
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está utilizando um GET'))

    //POST para enviar dados
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    })
}
