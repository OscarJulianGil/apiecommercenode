const router = require('express').Router();
const productoSchema = require('../schemas/productoSchema');



router.get('/ecommerce/producto/getall',(req,res) => {
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

module.exports = router;