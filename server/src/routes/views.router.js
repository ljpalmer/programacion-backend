import express from "express";
import productManager from '../class/product/ProductManager.js';
import persistenceManager from '../class/PersistenceManager.js';


const ROUTER = express.Router();

const FILE_NAME = "productos.json";
let objProductManager = new productManager('json', new persistenceManager(),FILE_NAME);



ROUTER.get("/", (req,res) => {
    res.render("index", {});
});


ROUTER.get("/home", async (req,res) => {
    let products = await objProductManager.getProducts();        
    res.render("home", {products});
});


ROUTER.get("/realtimeproducts", async (req,res) => {    
    res.render("realTimeProducts", {});
});

export default ROUTER;