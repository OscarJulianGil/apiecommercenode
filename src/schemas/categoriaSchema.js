const mongoose = require('mongoose');


const categoriaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:false
    },
    imagen:{
        type: String,
        required:false
    }
})
module.exports = mongoose.model("categorias",categoriaSchema);