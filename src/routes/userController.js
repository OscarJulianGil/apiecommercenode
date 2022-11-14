const userRouter = require("express").Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require('bcryptjs');




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



module.exports = userRouter;