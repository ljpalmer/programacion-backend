import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const APP = express();

APP.use(express.json());
APP.use(express.urlencoded({extended:true}));

APP.use('/api/product', productsRouter);
APP.use('/api/cart', cartsRouter);

const SERVER_PORT = 9090;

APP.listen(SERVER_PORT, () => {
    console.log(`Servidor escuchando desde el puerto ${SERVER_PORT}`);
});