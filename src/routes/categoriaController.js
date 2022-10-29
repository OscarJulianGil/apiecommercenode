const express = require('express');
const categoriaSchema = require('../schemas/categoriaSchema');


//Router
const categoriaRouter = express.Router();

//Retorna todas las categorias
categoriaRouter.get('/categoria/getall',(req,res) => {
    categoriaSchema.find().then((data) => {
        console.log("Consulta de categorias realizada exitosamente");
        var response = {
            code : 200,
            message : "Consulta realizada exitosamente",
            data : data
        }
        res.json(response);
    }).catch((error) => {
        console.log("Error en la consulta" + error);
        var response = {
            code : 500,
            message : "Server error" + error,
            data : error
        }
        res.json(response);
    })
})


//Crear una categoria
categoriaRouter.post('/categoria/create',(req,res) => {
    const newCategoria = categoriaSchema(req.body);
    newCategoria.save().then((data) =>{
        console.log("Categoria creada exitosamente");
        var response = {
            code : 200,
            message : "Categoria creada exitosamente",
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
})






module.exports = categoriaRouter;