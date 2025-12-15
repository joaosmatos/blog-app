// carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyparser = require("body-parser")
    const app = express()
    const admin = require("./rotas/admin")
    const path = require("path")
    //const mongoose = require("mongoose")
// configurações
    //bdy parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
    // mongoose
        mongoose.promise = global.promise;
        mongoose.conect("mongodb://localhost/blogapp").then(() => {
            console.log("Conectado ao mongo")
        }).catch((err) => {
            console.log("Erro ao se conectar: "+err)
        })
    // public
        app.use(express.static(path.join(__dirname,"public")))

        app.use((req, res, next ) => {
            console.log("OI EU SOU UM MIDDLEWARE!")
            next();
        })

// rotas
    app.get('/', (req, res) => {
        res.send('rota principal')
    })

    app.get('/posts', (req, res) => {
        res.send("lista posts")
    })

    app.use('/admin', admin)
// outros
const PORT = 8081
app.listen(PORT,() => {
    console.log("servidor rodando! ")
})