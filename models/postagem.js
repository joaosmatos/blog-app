const mongoose = require("mongoose")
const schema = mongoose.Schema;

const Postagem = new Schema({
    titulo:{
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descriçao:{
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria:{
        type: Schema.type.objectId,
        ref: "categorias",
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("postagens", Postagem)