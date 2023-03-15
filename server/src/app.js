import express, { request } from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import handlebars from 'express-handlebars' 
import __dirname from './util.js'
import viewRouter from './routes/views.router.js'
import configureSocket from './socket/configure-socket.js';
import configureHandlebars from './middleware/hbs.middleware.js';
import mongose from 'mongoose';


const APP = express();

APP.engine('handlebars', handlebars.engine());
APP.use(express.json());
APP.use(express.urlencoded({extended:true}));

//Carpeta public
APP.use(express.static(__dirname + "/public"));

APP.use('/api/product', productsRouter);
APP.use('/api/cart', cartsRouter);
APP.use('/api/chat', chatRouter);

APP.use("/", viewRouter);


configureHandlebars(APP);

const SERVER_PORT = 9090;

const HTTP_SERVER = APP.listen(SERVER_PORT, () => console.log('Listening on PORT: '+ SERVER_PORT));

configureSocket(HTTP_SERVER);

const connectMongoDB = async () => {
    try {
        await mongose.connect('CONNECTION_STRING_MONGODB'); //Cambiar por la cadena de conexion
        console.log("Conectado con exito a MongoDB usando Mongoose");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Mongoose " + error);
        process.exit;
    }
};

connectMongoDB();