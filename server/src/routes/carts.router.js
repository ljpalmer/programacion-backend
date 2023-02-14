import { Router } from "express";
import cart from "../class/cart/Cart.js"
import cartManager from '../class/cart/CartManager.js'
import persistenceManager from '../class/PersistenceManager.js';

const CART = Router();
const FILE_NAME = "carrito.json";

let objCartManager = new cartManager('json', new persistenceManager(),FILE_NAME);

CART.post('/', async (request, response) => {         
    // console.log(itemCart); 
     try {        
        let cartId = await objCartManager.addCart();        
            if (cartId!=-1) {
                response.send({status: "Success", message : `Carrito creado con ID: ${cartId}` });
            }else{
                response.status(400).send({status: "Error", message: "Error al crear el carrito."});
            }                    
     } catch (error) {
        response.status(500).send({status: "Error", message: "Error al crear el carrito, error desde el servidor"});
     }
});

CART.get('/:cid', async (request, response) => {
    let responseEndPoint = {
        Data : [],
        Success : false,
    };
    let id = request.params.cid;
    let cart = await objCartManager.getCartById(id);
    responseEndPoint.Data = cart;
    if (cart.id != 0){
        responseEndPoint.Success = true;
    }    
    response.send(JSON.stringify(responseEndPoint));
});

CART.post('/:cid/product/:pid', async (request, response) => {
    let responseEndPoint = {
        Data : [],
        Success : false,
    };
    let cartId = request.params.cid;
    let productId = request.params.pid;
    let success = await objCartManager.addProductToCart(cartId, productId);    
    if (success){
        let cart = await objCartManager.getCartById(cartId);
        responseEndPoint.Data = cart;
        responseEndPoint.Success = true;
    }    
    response.send(JSON.stringify(responseEndPoint));
});

export default CART;