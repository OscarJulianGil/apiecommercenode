const authRouter = require("express").Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


authRouter.post("/login",async (req,res)=>{
    //Tomo los datos para la autenticacion
    const username = req.body.username;
    const password = req.body.password;

    //Validamos informacion
    if(username == null || username == ""){
        var response = {
            code : 500,
            message : "Nombre de usuario no válido",
            data : null
        }
        res.json(response);
        return;
    }
    if(password == null || password == ""){
        var response = {
            code : 500,
            message : "Contraseña no válida",
            data : null
        }
        res.json(response);
        return;
    }

    await userSchema.findByemail(username).then((data) => {

        if(data.length <= 0){
            var response = {
                code : 500,
                message : "El usuario no esta registrado",
                data : data
            }
            res.json(response);
        }
        else{
            bcrypt.compare(password, data[0].password).then(function(result) {
                if(result){
                    //Generamos el token para peticiones
                    const token = jwt.sign(
                        { id: data.__id},
                        process.env.TOKEN_KEY,
                        {
                          expiresIn: "2h",
                        }
                    );

                    var response = {
                        code : 200,
                        message : "Usuario autenticado exitosamente",
                        data : {
                            nombres:data[0].nombres,
                            apellidos: data[0].apellidos,
                            correo: data[0].correo,
                            token: token
                        }
                    }
                    res.json(response);
                }
                else{
                    var response = {
                        code : 500,
                        message : "Contraseña no valida",
                        data : data
                    }
                    res.json(response);
                }
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

module.exports = authRouter;