//Arquivo com respondabilidade de configurar o express
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    const app =  express()
    
    //bodyParser definindo o tipo de dados que a API irá receber
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    consign()
        .include('controllers')
        .into(app)

    return app
 }


