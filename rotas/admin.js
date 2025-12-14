const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/categoria")
const categoria = mongoose.model("categorias")

router.get('/',(req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("pagina de posts")
})

router.get("/categorias", (req, res) => {
    res.render("adimin/categorias")
})

router.get('/categorias/add', (req, res) => {
    res.render("adimin/addcategorias")
})

router.post("/categorias/nova", (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        console.log("Categoria salva com sucesso!")
    }).catch((err) => {
        console.log("Erro ao salvar categoria!")
    })
})


module.exports = router