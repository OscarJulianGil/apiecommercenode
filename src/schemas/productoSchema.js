const mongoose = require('mongoose');


const productoSchema = mongoose.Schema({

    nombre:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true
    },
    precio:{
        type: Number,
        required:true
    },
    preciofestivo:{
        type: Number,
        required:false
    },
    cantidaddisponible:{
        type: Number,
        required:true
    },
    categoriaid:{
        type: mongoose.Schema.ObjectId,
        ref: 'categorias'
    },
    imagen:{ 
        data:String,
        url: String, 
        name:String
    }
})

module.exports = mongoose.model("productos",productoSchema);