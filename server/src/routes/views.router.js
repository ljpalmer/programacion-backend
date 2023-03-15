import express from "express";
import { productsModel } from "../dao/models/products.model.js";

const ROUTER = express.Router();

ROUTER.get("/", (req,res) => {
    res.render("index", {});
});


ROUTER.get("/home", async (req,res) => {    
    let products = await productsModel.find();
    console.log(products);
    res.render("home", {products});
});


ROUTER.get("/realtimeproducts", async (req,res) => {    
    res.render("realTimeProducts", {});
});
//Nuevo Desafio
ROUTER.get("/chat", async (req,res) => {    
    res.render("chat", {});
});

export default ROUTER;