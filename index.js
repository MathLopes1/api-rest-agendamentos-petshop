const express = require('express')
const app =  express()

app.listen(3000, () => console.log('servidor rodando na porta 300'))

app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos'))