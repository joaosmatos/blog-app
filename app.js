// carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyparser = require("body-parser")
    const app = express()
    //const mongoose = require("mongoose")
// configurações
    //bdy parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
    // mongoose
// rotas

// outros
const PORT = 8081
app.listen(PORT,() => {
    console.log("servidor rodando! ")
})