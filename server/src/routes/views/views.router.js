import { Router } from "express"
import { auth } from "../../middleware/auth.js"
import ViewsController from "../../controllers/views/views.controller.js"
import { roleAdminVerify, roleUserVerify } from "../../middleware/roleVerify.js"

const viewsController = new ViewsController

const router = Router()

router.get('/products', auth, viewsController.productsRender)

router.get('/carts/:cid', viewsController.cartsRender)

router.get('/realtimeproducts', viewsController.realTimeProductsRender)

router.get('/chat',roleUserVerify , viewsController.chat)

export default router

// import express from "express";
// import { auth } from "../../middleware/auth.js"
// import { authChat } from "../../middleware/authChat.js"
// import { productsModel } from "../../daos/mongo/product.mongo.js";
// import { cartsModel } from "../../daos/mongo/cart.mongo.js";
//
// const ROUTER = express.Router();
//
// ROUTER.get("/", (req,res) => {
//     res.render("index", {});
// });
//
//
// ROUTER.get("/home", async (req,res) => {
//     let products = await productsModel.find();
//     console.log(products);
//     res.render("home", {products});
// });
//
// ROUTER.get("/realtimeproducts", async (req,res) => {
//     res.render("realTimeProducts", {});
// });
// //Nuevo Desafio
// ROUTER.get("/chat", authChat,async (req,res) => {
//     res.render("chat", {});
// });
//
// //Nuevo Desafio
// ROUTER.get("/products", auth, async (req, res) => {
//     var usuario = req.session.user;
//     if(usuario){
//         let page = parseInt(req.query.page);
//         let limit = parseInt(req.query.limit);
//         if(!page) page = 1;
//         if(!limit) limit = 10;
//         console.log(req.session.user.name);
//         let result = await productsModel.paginate({}, {page, limit: limit, lean:true});
//         result.prevLink = result.hasPrevPage ? `http://localhost:9090/products?page=${result.prevPage}&limit=${result.limit}` : ``;
//         result.nextLink = result.hasNextPage ? `http://localhost:9090/products?page=${result.nextPage}&limit=${result.limit}` : ``;
//         result.isValid = !(page<=0 || page > result.totalPage);
//         result.usuario = req.session.user.name;
//         result.role = req.session.user.role;
//         // console.log(result);
//         res.render("products", { result });
//     }else{
//         res.redirect("users/login");
//     }
//
// });
//
// ROUTER.get("/carts/:cid", async (req,res) => {
//     let cartId  = req.params.cid;
//
//     const cart = await cartsModel.findOne({ _id: cartId }).populate('products.type');
//     console.log(cart);
//     const products = cart.products.map(product => {
//         if (!product.type) {
//           return null;
//         }
//         return {
//           _id: product.type._id,
//           description: product.type.description,
//           title: product.type.title,
//           code: product.type.code,
//           price: product.type.price,
//           stock: product.type.stock,
//           category: product.type.category,
//           thumbnail: product.type.thumbnail,
//           quantity: product.quantity
//         };
//       }).filter(product => product !== null);
//
//     //   products.forEach(element => {productIds.push(element._id);});
//
//     res.render("cart", {products, cartId});
// });
//
// export default ROUTER;