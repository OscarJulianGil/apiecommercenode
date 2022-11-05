const mongoose = require("mongoose");


const userSchema = mongoose.Schema({

    nombres:{
        type:String,
        required:true
    },
    apellidos:{
        type:String,
        required:true
    },
    correo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    statics: {
        findByemail(correo) {
          return this.find({ correo: correo });
        }
      }
    }
)

module.exports =  mongoose.model("usuarios",userSchema);