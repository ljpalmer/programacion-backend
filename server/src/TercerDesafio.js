import express from 'express';
import productManager from './class/ProductManager.js';
import persistenceManager from './class/PersistenceManager.js';
import product from './class/product/Product.js';

const APP = express();

const FILE_NAME = "productos.json";

let objProductManager = new productManager('json', new persistenceManager(),FILE_NAME);

//Cargamos datos solo si registros es igual a cero
if (objProductManager.numberRecords() == 0){
    let product01 = new product("Producto Prueba Nuevo 01","Este es un producto de prueba nuevo",300,'Sin Imagen','abc890',10);
    let product02 = new product("Producto Prueba Nuevo 02","Este es un producto de prueba nuevo",200,'Sin Imagen','abc567',50);
    let product03 = new product("Producto Prueba Nuevo 03","Este es un producto de prueba nuevo",200,'Sin Imagen','abc390',100);

    objProductManager.addProduct(product01);
    objProductManager.addProduct(product02);
    objProductManager.addProduct(product03);
}

APP.use(express.urlencoded({extended:true}));
APP.get("/products", async (request, response) => {
    let responseEndPoint = {
        Data : [],
        Success : true,
        WithLimit : false
    };    

    let limit = request.query.limit;
    let products = await objProductManager.getProducts();    
    responseEndPoint.Data = products;
    try {
        if(limit) {      
            responseEndPoint.Data = products.slice(0, limit);
            responseEndPoint.WithLimit = true;
        }else{
            responseEndPoint.Data = products;  
        }
    } catch (error) {
        responseEndPoint.Exito = false;
    }
    response.send(JSON.stringify(responseEndPoint));
});

APP.get("/products/:id", async (request, response) => {
    // response.send("Hola mundo desde NodeJS usando express");
    let responseEndPoint = {
        Data : [],
        Success : false,
    };
    let id = request.params.id;
    let product = await objProductManager.getProductById(id);
    responseEndPoint.Data = product;
    if (product.id != 0){
        responseEndPoint.Success = true;
    }    
    response.send(JSON.stringify(responseEndPoint));
});


const SERVER_PORT = 9090;

APP.listen(SERVER_PORT, () => {
    console.log(`Servidor escuchando desde el puerto ${SERVER_PORT}`);
});