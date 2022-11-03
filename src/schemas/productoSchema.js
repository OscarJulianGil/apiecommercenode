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
        required:true
    },
    cantidaddisponible:{
        type: Number,
        required:true
    },
    categoriaid:{
        type: String,
        required:true
    },
    imagen:[
        {
            productoimagen:
            {
                type: String,
                required:true
            }
        }
    ]
})

module.exports = mongoose.model("productos",productoSchema);