import express, { request } from 'express';
import {Server} from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars' 
import __dirname from './util.js'
import viewRouter from './routes/views.router.js'

import productManager from './class/product/ProductManager.js';
import persistenceManager from './class/PersistenceManager.js';
import product from './class/product/Product.js';

const APP = express();


APP.engine('handlebars', handlebars.engine());
APP.use(express.json());
APP.use(express.urlencoded({extended:true}));

//Vista de Plantillas
APP.set('views', __dirname + "/views");
APP.set('view engine','handlebars');

//Carpeta public
APP.use(express.static(__dirname + "/public"));

APP.use('/api/product', productsRouter);
APP.use('/api/cart', cartsRouter);

APP.use("/", viewRouter);


// APP.get("/hello", (req, res) => {    
//     let user = {
//         name: "Luis",
//         age : 20
//     }
//     res.render("hello", user);
// });


const SERVER_PORT = 9090;

const HTTP_SERVER = APP.listen(SERVER_PORT, () => console.log('Listening on PORT: '+ SERVER_PORT));
const SOCKET_SERVER = new Server(HTTP_SERVER);


const FILE_NAME = "productos.json";
let objProductManager = new productManager('json', new persistenceManager(),FILE_NAME);


SOCKET_SERVER.on('connection', async (socket) => {
    // console.log(socket);
    console.log("Nuevo cliente conectado.");

    socket.on("loadProducts", async(data) => {
        // console.log(data);
        let products = await objProductManager.getProducts();
        SOCKET_SERVER.emit('listUpdateProducts', products);
    });


    socket.on("registerProduct", async(socket) => {
        let itemProduct = new product(socket.title,
                                      socket.description,
                                      socket.code,
                                      socket.price,
                                      socket.status,
                                      socket.stock,
                                      socket.category,
                                      socket.thumbnails
                                  );         
     try {        
        console.log(socket);
            itemProduct.id = await objProductManager.addProduct(itemProduct);
            if (itemProduct.id != -1) {
                let products = await objProductManager.getProducts();
                SOCKET_SERVER.emit('listUpdateProducts', products);                                
            }
     } catch (error) {
        console.log(error);        
     }
    });

    socket.on("deleteProduct" , async(socket) => {
        console.log(socket);
        let id = socket.idproduct;
        let result = await objProductManager.deleteProductById(id);        
        if (result){
            let products = await objProductManager.getProducts();
            SOCKET_SERVER.emit('listUpdateProducts', products);
        }
    });
});

SOCKET_SERVER.on('error', (err) => console.log(err));