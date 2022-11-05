const userRouter = require("express").Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require('bcrypt');




userRouter.get("/user/getall",(req,res) =>{
    userSchema.find().then((data) => {
        var response = {
            code : 200,
            message : "Consulta realizada exitosamente",
            data : data
        }
        res.json(response);
    }).catch((error) => {
        var response = {
            code : 500,
            message : "Server error" + error,
            data : error
        }
        res.json(response);
    })
})

userRouter.post("/user/create",(req,res)=>{
    //Mapear el esquema recibido en el request, con el esquema de mongoDB
    const newUser = userSchema(req.body);

    //Validamos que el correo no exista en la base de datos.
    userSchema.findByemail(req.body.correo).then((data) =>{
        if(data.length > 0){
            var response = {
                code : 500,
                message : "El correo ya esta registrado en el sistema",
                data : null
            }
            res.json(response)
        }
        else{
            const saltRounds = 10;
            //Encriptamos el password.
            bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err)
            {
                var response = {
                    code : 500,
                    message : "Error guardando el usuario",
                    data : err
                }
                res.json(response)
            }
            else{
                newUser.password = hash;
                newUser.save().then((data) =>{
                    var response = {
                        code : 200,
                        message : "Usuario registrado  exitosamente",
                        data : data
                    }
                    res.json(response)
                }).catch((error) => {
                    var response = {
                        code : 500,
                        message : "Server error" + error,
                        data : error
                    }
                    res.json(response);
                })
            }
        });
     });
    }
    }).catch((error) => {
        var response = {
            code : 500,
            message : "Server error" + error,
            data : error
        }
        res.json(response);
    }) 
})


module.exports = userRouter;