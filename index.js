const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const categoriaRouter = require('./src/routes/categoriaController');
const productoRouter = require('./src/routes/productoController');
const userRouter = require('./src/routes/userController');
const authRouter = require('./src/routes/authController');
const tokenvalidation = require('./src/middleware/auth');

require('dotenv').config();

const app = express();
app.use(cors());
//Configuramos express como json data
app.use(express.json());
//Ruta inicial
app.get('/',(req,res)=> {
    res.send("Servidor funcionando...");
})

//Demas rutas de los controladores
app.use('/api',authRouter);
app.use('/api',tokenvalidation,categoriaRouter);
app.use('/api',tokenvalidation,productoRouter);
app.use('/api',tokenvalidation,userRouter);


//configuramos carpeta publica del servidor
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')))

//Conexión a la base de datos
/*mongoose.connect(process.env.databaseUrlCloud).then(() => {
    console.log("Mongo DB connected...");
}).catch((error) => {
    console.log("database connect error: " + error);
})*/

mongoose.connect("mongodb+srv://oscarjuligil:Temporal1232022@cluster0.eppm99e.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Mongo DB local connected...");
}).catch((error) => {
    console.log("database connect error: " + error);
})

app.listen(process.env.appPort,() => { console.log("Server is listening")})