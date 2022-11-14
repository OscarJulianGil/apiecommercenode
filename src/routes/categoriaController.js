const express = require('express');
const categoriaSchema = require('../schemas/categoriaSchema');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

//Router
const categoriaRouter = express.Router();

//Retorna todas las categorias
categoriaRouter.get('/categoria/getall',async (req,res) => {
    categoriaSchema.find().then((data) => {
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

//Retorna todas las categorias
categoriaRouter.get('/categoria/getbyname/:name',(req,res) => {

    categoriaSchema.findByName(req.params.name).then((data) => {
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

//Crear una categoria
categoriaRouter.post('/categoria/create',async(req,res) => {
    //Mapear el esquema recibido en el request, con el esquema de mongoDB
    const newCategoria = categoriaSchema(req.body);
    
    if(newCategoria.imagen.data != null){
        //Tomar los datos del base64
        const fileContents = new Buffer.from(newCategoria.imagen.data, 'base64')

        //Guardo el archivo en una ruta dada.
        await fs.writeFileSync(path.join(__dirname, '..','..', 'public/images/') + newCategoria.imagen.name, fileContents, err => {
            if (err) {
                console.error(err);
            }
        });

        //Limpia la data del base 64
        newCategoria.imagen.data = "";
        newCategoria.imagen.url = process.env.pathfiles + newCategoria.imagen.name;
    }
    
    await newCategoria.save().then((data) =>{
        
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

//Actualizar categoria
categoriaRouter.post('/categoria/update/:id',(req,res)=>{
        let { id } = req.params;
        const {nombre, descripcion, imagen} = req.body;
        categoriaSchema.updateOne({_id : id}, {$set: { nombre,descripcion }}).then((data) =>{
        var response = {
            code : 200,
            message : "Categoria actualizada exitosamente",
            data : data
        }
        res.json(response);
    }).catch((error) =>{
        var response = {
            code : 500,
            message : "Server error" + error,
            data : error
        }
        res.json(response);
    })
})

//Eliminar categoria
categoriaRouter.get('/categoria/delete/:id',(req,res)=>{
        let { id } = req.params;

        categoriaSchema.remove({_id:id}).then((data) =>{
        var response = {
            code : 200,
            message : "Categoria eliminada exitosamente",
            data : data
        }
        res.json(response);
    }).catch((error) =>{
        var response = {
            code : 500,
            message : "Server error" + error,
            data : error
        }
        res.json(response)
    })
})

module.exports = categoriaRouter;