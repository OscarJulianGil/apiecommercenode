const express = require('express');
const productoSchema = require('../schemas/productoSchema');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


//Router
const productoRouter = express.Router();

//Retorna todas las categorias
productoRouter.get('/producto/getall',(req,res) => {
    try{
        productoSchema.find().populate('categoriaid').exec((err,data) => {
            if(err){
                var response = {
                    code : 500,
                    message : "Error",
                    data:err
                }
                res.json(response);
            }else{
                var response = {
                    code : 200,
                    message : "Consulta realizada exitosamente",
                    data:data
                }
                res.json(response);
            }
        })
    }
    catch(error){
        var response = {
            code : 500,
            message : "Server error" + error,
            data : error
        }
        res.json(response);
    }
})


//Crear una categoria
productoRouter.post('/producto/create',async (req,res) => {
        //Mapear el esquema recibido en el request, con el esquema de mongoDB
        const newProducto = productoSchema(req.body);

        if(newProducto.imagen.data != null){
            var dir = path.join(__dirname,'..','..', 'public/images/productos/') + newProducto.nombre;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            
            //Tomar los datos del base64
            const fileContents = new Buffer.from(newProducto.imagen.data, 'base64')
    
            //Guardo el archivo en una ruta dada.
            await fs.writeFileSync(dir + '/' + newProducto.imagen.name, fileContents, err => {
                if (err) {
                    console.error(err);
                }
            });
    
            //Limpia la data del base 64
            newProducto.imagen.data = "";
            newProducto.imagen.url = process.env.pathfiles + 'productos/' + newProducto.nombre + '/'  + newProducto.imagen.name;
        }

        newProducto.save().then((data) =>{
        
        var response = {
            code : 200,
            message : "Producto registrado exitosamente",
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

productoRouter.get('/producto/delete/:id',(req,res)=>{
    let { id } = req.params;

    productoSchema.deleteOne({_id:id}).then((data) =>{
    var response = {
        code : 200,
        message : "Producto eliminado exitosamente",
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


module.exports = productoRouter;