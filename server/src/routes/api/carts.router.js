import { Router } from "express"
import CartsApiController from "../../controllers/api/cart.controller.js"
import { roleUserVerify } from "../../middleware/roleVerify.js"

const router = Router()

const cartsController = new CartsApiController();

router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCartProducts)

router.post('/:cid/product/:pid', roleUserVerify, cartsController.newProduct)

router.delete('/:cid/product/:pid', roleUserVerify, cartsController.deleteProduct)

router.put('/:cid/product/:pid', cartsController.uploadProduct)

router.delete('/:cid', cartsController.deleteCartProducts)

router.put('/:cid', cartsController.arrayProductsUpdate)

router.get('/:cid/purchase', cartsController.createTicket)

export default router
// import Router  from "express";
// import mongose from 'mongoose';
// import Cart from '../../class/cart/Cart.js'
// import {cartsModel} from '../../daos/mongo/cart.mongo.js'
// import {productsModel} from '../../daos/mongo/product.mongo.js'
//
// const CART = Router();
//
// //Eliminar del carrito el producto seleccionado
// CART.delete('/:cid/products/:pid', async (request, response) => {
//     //ALERTA REALIZAR PRUEBA LUEGO DE PUT
//     //http://localhost:9090/api/cart/641adec70d0924989881f7cb/products/641146888b64fc4a6dc26545
//     let cartId  = request.params.cid;
//     let productId  = request.params.pid;
//
//     const existingProduct = await cartsModel.findOne({
//         _id: cartId,
//         products: {
//             $elemMatch: {
//                 type: productId
//             }
//         }
//     });
//     console.log(existingProduct);
//     try {
//         if (existingProduct) {
//             //Eliminar el producto encontrado
//             await cartsModel.findByIdAndUpdate(
//                 cartId,
//                 { $pull: { products: { type: productId } } },
//                 { new: true }
//               );
//         }
//         response.send({status: "Success", message: `Producto removido correctamente del carrito`});
//     } catch (error) {
//         response.status(500).send({error: "No se pudo obtener remover el producto con mongoose: ", message: error});
//     }
// });
//
// //Debera eliminar todos los productos del carrito
// CART.delete('/carts/:cid', async (request , response) => {
//     //ALERTA REALIZAR PRUEBA AL ULTIMO DESPUES DE PUT
//     //http://localhost:9090/api/cart/carts/641aa3ce09f326442aff179f
//
//     let cartId  = request.params.cid;
//     let productIds = [];
//     const cart = await cartsModel
//     .findOne({ _id: cartId })
//     .populate('products.type');
//
//     const products = cart.products.map(product => {
//         if (!product.type) {
//           return null;
//         }
//         return {
//           _id: product.type._id,
//           description: product.type.description,
//           price: product.type.price,
//           stock: product.type.stock,
//           quantity: product.quantity
//         };
//       }).filter(product => product !== null);
//
//     //   products.forEach(element => {productIds.push(element._id);});
//       productIds = products.map(product => product._id);
//     //   console.log(products);
//       try {
//         console.log('ProductIds antes de validar:', productIds);
//
//         const result = await cartsModel.findByIdAndUpdate( cartId, { $pull: { products: { type: { $in: productIds } } } }, { new: true } );
//         console.log('Result:', result);
//           response.send({status: "Success", message: `Productos removidos correctamente`});
//       } catch (error) {
//         response.status(500).send({error: "No se pudo obtener remover los productos con mongoose: ", message: error});
//       }
//
// });
//
// //Actualizar el carrito recibiendo un arreglo de productos  con el formato especificado
// CART.put('/:cid', async (request, response) => {
//     //http://localhost:9090/api/cart/641aa3ce09f326442aff179f
//     // {
//     //     "products" : [
//     //         {
//     //             "_id" : "641a5c13bfef5a6309b66f78",
//     //             "quantity" : 2
//     //         },
//     //         {
//     //             "_id" : "641146888b64fc4a6dc26545",
//     //             "quantity" : 12
//     //         }
//     //     ]
//     //  }
//     const cartId = request.params.cid;
//     const productsToUpdate = request.body.products;
//     console.log(cartId);
//     console.log(productsToUpdate);
//     try {
//
//         productsToUpdate.forEach(async element => {
//             await cartsModel.findOneAndUpdate({_id: cartId, 'products.type': element._id}, { $set: { 'products.$.quantity': element.quantity }});
//         });
//
//       response.send({status: "Success", message: "Products updated successfully"});
//     } catch (error) {
//         response.status(500).json({ message: 'Error updating products in cart', error });
//     }
// });
//
// //Debera actualizar el carrito buscando el producto especifico y actualizar la cantidad
// CART.put('/:cid/products/:pid', async (request, response) => {
//     //http://localhost:9090/api/cart/641adec70d0924989881f7cb/products/641a49c0bfef5a6309b66f77
//     // {
//     //     "cantidad" : 4
//     // }
//     const {cantidad} = request.body;
//     if (cantidad) {
//         const cartId = request.params.cid;
//         const productId = request.params.pid; // '641146888b64fc4a6dc26545';  Replace with your student's _id
//         const product = await productsModel.findById(productId);
//         try {
//             if (!product) {
//                 return response.status(404).json({message: 'Producto no encontrado'});
//             }
//             const existingProduct = await cartsModel.findOne({
//                 _id: cartId,
//                 products: {
//                     $elemMatch: {
//                         type: product._id
//                     }
//                 }
//             });
//             if (!existingProduct) {
//                 await cartsModel.findByIdAndUpdate(cartId, {
//                     $push: {
//                         products: {
//                             type: product._id,
//                             quantity: cantidad
//                         }
//                     }
//                 });
//             } else {
//                 // await cartModel.findOneAndUpdate({_id: cartId, 'products.type': product._id}, { $inc: { 'products.$.quantity': 1 }});
//                 await cartsModel.findOneAndUpdate({
//                     _id: cartId,
//                     'products.type': product._id
//                 }, {
//                     $set: {
//                         'products.$.quantity': cantidad
//                     }
//                 });
//             }
//             response.send({status: "Success", message: `Producto agregado correctamente`});
//         } catch (error) {
//             response.status(500).send({error: "No se pudo obtener registrar el producto con mongoose: ", message: error});
//         }
//     }
// });
//
//
//
//
// CART.post('/', async (request, response) => {
//      try {
//         console.log("Empezando Guardado");
//         let itemCart = new Cart([]);
//         console.log(itemCart);
//         let data = new cartsModel(itemCart);
//         console.log("Va a guardar!");
//         await data.save();
//         console.log("Carrito Guardado");
//         // let cartId = await objCartManager.addCart();
//             // if (cartId!="") {
//                 let itemCartProducto = 0;
//         response.send({status: "Success", message : `Carrito creado con ID: ${itemCartProducto}` });
//             // }else{
//             //     response.status(400).send({status: "Error", message: "Error al crear el carrito."});
//             // }
//      } catch (error) {
//         console.log()
//         response.status(500).send({status: "Error", message: "Error al crear el carrito, error desde el servidor"});
//      }
// });
//
// CART.get('/:cid', async (request, response) => {
//     let responseEndPoint = {
//         Data : [],
//         Success : false,
//     };
//     let id = request.params.cid;
//     // let cart = await objCartManager.getCartById(id);
//     let cart = cartsModel.findById(id);
//     responseEndPoint.Data = cart;
//     if (cart.id != 0){
//         responseEndPoint.Success = true;
//     }
//     response.send(JSON.stringify(responseEndPoint));
// });
//
// // CART.post('/:cid/product/:pid', async (request, response) => {
// //     let responseEndPoint = {
// //         Data : [],
// //         Success : false,
// //     };
// //     let cartId = request.params.cid;
// //     let productId = request.params.pid;
// //     let success = await objCartManager.addProductToCart(cartId, productId);
// //     if (success){
// //         let cart = await objCartManager.getCartById(cartId);
// //         responseEndPoint.Data = cart;
// //         responseEndPoint.Success = true;
// //     }
// //     response.send(JSON.stringify(responseEndPoint));
// // });
//
// export default CART;