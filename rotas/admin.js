const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/categoria")
const categoria = mongoose.model("categorias")
require('../models/postagem')
const Postagem = mongoose.model("postagens")

router.get('/',(req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("pagina de posts")
})

router.get("/categorias", (req, res) => {
    Categoria.find().sort({date:'desc'}).then((categorias) => {
        res.render("adimin/categorias", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req, res) => {
    res.render("adimin/addcategorias")
})

router.post("/categorias/nova", (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "nome invalido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "slug invalido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "nome da categoria muito pequeno"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})
    }else{
      const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        req.flash("sucess_msg", "categoria criada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "houve um erro ao salvar a categoria, tente novamente!")
        console.log("Erro ao salvar categoria!")
        res.redirect("/admin")
    })  
    }

    
})

router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render("admin/categorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("admin/editcategorias")
    })
    
})

router.post("/categorias/edit", (req, res) => {
    categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/adimin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria")
            res.redirect("/admin/categorias")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", (req, res) => {
    categoria.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "categoria deletada com sucesso!")
        req.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "houve um erro ao deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", (req, res) => {

    Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) =>{
        res.render("admin/postagens",{postaggens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens")
        res.redirect("/admin")
    })
    
})

router.get("/postagens/add", (req, res) => {
    Categoria.find().then((categorias) => {
       res.render("admin/addpostagem", {categorias: categorias}) 
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulario")
        res.redirect("/admin")
    })
    
})

router.post("/postagens/nova", (req, res) => {
    var erros = []

    if(req.body.categoria == "0"){
        erros.push({texto: "categoria invalida, registre uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagem", {erros: erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categora,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "postagem criada com sucesso!")
            req.redirect("admin/postagens")
        }).catch((err) =>{
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
            res.redirect("admin/postagens")
        })
    }
})

router.get("/postagens/edit/:id", (req, res) => {

    Postagem.findOne({_id: req.params.id}).then((postagem) => {

        Categoria.find().then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias,postagem: postagem})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias")
            res.redirect("/admin/postagens")
        })
        
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulario de edição")
        res.redirect("/admin/postagens")
    })

    
})

router.post("/postagem/edit", (req, res) => {
    Postagem.findOne({_id: req.body.id}.then((postagem) => {

        Postagem.titulo = req.body.titulo
        Postagem.slug = req.body.slug
        Postagem.descricao = req.body.descricao
        Postagem.conteudo = req.body.conteudo
        Postagem.categoria = req.body.categoria

        Postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect("admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/postagens")
        })
        
    }).catch((err)=> {
        req.flash("error_msg", "Houve um erro ao salvar a edição")
        res.redirect("/admin/postagens")
    }))
})


module.exports = router