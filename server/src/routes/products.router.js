import { Router } from "express";
import productManager from '../class/product/ProductManager.js';
import persistenceManager from '../class/PersistenceManager.js';
import product from '../class/product/Product.js';

const PRODUCT = Router();
const FILE_NAME = "productos.json";

let objProductManager = new productManager('json', new persistenceManager(),FILE_NAME);

PRODUCT.get('/', async (request, response) => {
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

PRODUCT.get("/:pid", async (request, response) => {    
    let responseEndPoint = {
        Data : [],
        Success : false,
    };
    let id = request.params.pid;
    let product = await objProductManager.getProductById(id);
    responseEndPoint.Data = product;
    if (product.id != 0){
        responseEndPoint.Success = true;
    }    
    response.send(JSON.stringify(responseEndPoint));
});

PRODUCT.post('/', async (request, response) => {
    let itemProduct = new product(request.body.title,
                                  request.body.description,
                                  request.body.code,
                                  request.body.price,
                                  request.body.status,
                                  request.body.stock,
                                  request.body.category,
                                  request.body.thumbnails
                                  );         
     try {        
            itemProduct.id = await objProductManager.addProduct(itemProduct);
            if (itemProduct.id != -1) {
                response.send({status: "Success", message : `Producto agregado con ID: ${itemProduct.id}` });
            }else{
                response.status(400).send({status: "Error", message: "Producto invalido, verifique los datos de entrada."});
            }                    
     } catch (error) {
        response.status(500).send({status: "Error", message: "Producto invalido, verifique los datos de entrada."});
     }
});

PRODUCT.put("/", async (request, response) => {
    let result = false;
    let itemProduct = new product(        
        request.body.title,
        request.body.description,
        request.body.code,
        request.body.price,
        request.body.status,
        request.body.stock,
        request.body.category,
        request.body.thumbnails
        );   
    itemProduct.id = request.body.id;
    try {
        result = await objProductManager.updateProductById(itemProduct.id, itemProduct);    
        response.send({status: "Success", message : `Producto actualizado con ID: ${itemProduct.id}` });
    } catch (error) {
        response.status(500).send({status: "Error", message: "Producto invalido, verifique los datos de entrada."});
    }
});


PRODUCT.delete("/", async (request , response) => {
    let id = request.body.id;
    let result = await objProductManager.deleteProductById(id);
    if (result){
        response.send({status: "Success", message : `Producto eliminado con ID: ${id}` });
    }else{
        response.status(500).send({status: "Error", message: "Verifique el ID, el producto no pudo ser eliminado."});
    }
});

export default PRODUCT;