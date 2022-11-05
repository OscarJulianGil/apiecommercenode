const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const categoriaRouter = require('./routes/categoriaController');
const productoRouter = require('./routes/productoController');
const userRouter = require('./routes/userController');
const authRouter = require('./routes/authController');


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
app.use('/api',categoriaRouter);
app.use('/api',productoRouter);
app.use('/api',userRouter);
app.use('/api',authRouter);

//configuramos carpeta publica del servidor
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')))

//Conexión a la base de datos
/*mongoose.connect(process.env.databaseUrlCloud).then(() => {
    console.log("Mongo DB connected...");
}).catch((error) => {
    console.log("database connect error: " + error);
})*/

mongoose.connect(process.env.databaseUrlLocal).then(() => {
    console.log("Mongo DB local connected...");
}).catch((error) => {
    console.log("database connect error: " + error);
})

app.listen(process.env.appPort,() => { console.log("Server is listening")})