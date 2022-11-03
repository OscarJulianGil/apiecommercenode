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
    imagen:
      { 
        data:String,
        url: String, 
        name:String
      }
    
},
{
    statics: {
      findByName(nombre) {
        return this.find({ nombre: new RegExp(nombre, 'i') });
      }
    }
  }
)
module.exports = mongoose.model("categorias",categoriaSchema);