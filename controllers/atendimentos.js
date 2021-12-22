//Arquivo com responsabilidade de controlar as rotas e difinir o que cada uma tem que fazer
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    //GET para pegar dados todos os dados
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    //GET para pegar um dado específico
    app.get('/atendimentos/:id', (req, res) => {
        //Transformando o id recebido de string para inteiro, pois é compatível com a informação no banco de dados
        const id = parseInt(req.params.id)
        
        //Trazendo o metodo da class atendimento e passando como parametros o id recebido e a resposta
        Atendimento.buscarPorId(id, res)
    })

    //POST para enviar dados
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    })

    //PATH para atualizar dados
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}
