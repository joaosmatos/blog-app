const mongoose = require('mongose')
const schema = mongoose.schema

const Usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
})

mongoose.model("usuarios", Usuario)