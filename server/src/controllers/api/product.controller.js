import { request } from "express"
import ProductsService from "../../services/db/product.service.js"

const productsService = new ProductsService();

export default class ProductsApiController {
    getProducts = async (req = request, res) => {
        const {limit, page = 1} = req.query
        try {
            let data = await productsService.getProducts(limit)

            res.send(data.docs)
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (req = request, res) => {
        const {pid} = req.params
        try {
            const allProducts = await productsService.getProducts()
            const productById = await productsService.getProductById(pid)

            pid ? res.send(productById) : res.send(allProducts)
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (req = request, res) => {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body

        try {
            await productsService.addProduct(title, description, price, thumbnail, code, stock, status, category)

            res.send({message: "Product added"})
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (req = request, res) => {
        const {pid} = req.params
        const { title, description, code, price, status, stock, category, thumbnail } = req.body

        let  obj =  { title, description, code, price, status, stock, category, thumbnail }
        try {
            await productsService.updateProduct(pid, obj)

            res.send({message: "Product updated"})
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (req = request, res) => {
        const {pid} = req.params        // se recibe pid de los parametros

        try {
            await productsService.deleteProduct(pid)

            res.send({message: "Product deleted"})
        } catch (error) {
            console.log(error)
        }
    }
}

//export default ProductsController