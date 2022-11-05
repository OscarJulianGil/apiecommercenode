const authRouter = require("express").Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");



authRouter.post("/login",async (req,res)=>{
    //Tomo los datos para la autenticacion
    const username = req.body.username;
    const password = req.body.password;

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
                    var response = {
                        code : 200,
                        message : "Usuario autenticado exitosamente",
                        data : data
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