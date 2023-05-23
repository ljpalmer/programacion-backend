import { request } from "express";
import CartsService from "../../services/db/cart.service.js";
import ProductsService from "../../services/db/product.service.js";
import TicketService from "../../services/db/ticket.service.js";

const ticketService = new TicketService();
const productsService = new ProductsService();
const cartsService = new CartsService();

export default class CartsApiController {
    createCart = async (req = request, res) => {
        await cartsService.createCart()

        res.send({message: "Cart created"})
    }

    getCartProducts = async (req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query
        try {
            const cartProducts = await cartsService.getCartProducts(cid, limit, page)

            res.send(cartProducts)
        } catch (error) {
            console.log(error)
        }
    }

    newProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.uploadProduct(cid, pid)

            res.send({message: "Product added to cart"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteProduct(cid, pid)

            res.send({message: "Product deleted from cart"})

        } catch (error) {
            console.log(error)
        }
    }

    uploadProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.uploadProduct(cid, pid)

            res.send({message: "Product added to cart"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteCartProducts = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteCartProducts(cid)

            res.send({message: "All products deleted from cart"})

        } catch (error) {
            console.log(error)
        }
    }

    arrayProductsUpdate = async (req = request, res) => {
        const { cid } = req.params
        const data = req.body

        try {
            await cartsService.arrayProductsUpdate(cid, data)

            res.send({message: "Array of products added to the cart"})

        } catch (error) {
            console.log(error)
        }
    }

    createTicket = async(req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query

        try {
            let sbProducts = [];
            let amount = 0;

            const cartProducts = await cartsService.getCartProducts(cid, limit, page);

            if(!cartProducts) return res.status(401).send({status: 'error', error:  cartProducts})
            for (const product of cartProducts.docs[0].products) {

                if (product.quantity < product.pid.stock) {

                    let updateProduct = product.pid;

                    updateProduct.stock = updateProduct.stock - product.quantity;

                    amount += product.pid.price;

                    req.logger.info('updateProduct: ', updateProduct);
                    console.log('updateProduct: ', updateProduct);

                    await productsService.updateProduct(product.pid._id, updateProduct);

                }else{
                    sbProducts.push(product);
                }
            }
            if(sbProducts.length === cartProducts.docs[0].products.length) return res.status(401).send({status: 'error', error:  sbProducts})

            await cartsService.arrayProductsUpdate(cid, sbProducts);
            req.logger.info('sbProducts: ', sbProducts);
            console.log("sbProducts", sbProducts);
            let purchase_datetime = new Date();

            let purchaser = req.session.email;
            console.log(amount, purchaser, purchase_datetime);

            let ticket = await ticketService.createTicket(purchase_datetime, amount, purchaser);

            res.send({
                status: "success",
                payload: ticket
            });
        } catch (error) {
            console.log(error);
        }
    }
}