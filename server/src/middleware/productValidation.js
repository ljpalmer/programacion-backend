import { generateCartProductErrorInfo } from "../utils/errorInfo.util.js"
import ProductsService from "../services/db/product.service.js"
import customError from "../utils/customError.util.js";
import ErrorTypes from "../utils/errorTypes.util.js";

const productsService = new ProductsService();

export default async function productValidationById (req, res, next){
    const { pid } = req.params;
    try {
        let product = await productsService.getProductById(pid)
        if (!product) {
            customError.createError({
                name: 'product not found',
                cause: generateCartProductErrorInfo(pid),
                message: 'Error trying upload products to cart',
                code: ErrorTypes.DATABASE_ERROR
            });
            return res.status(401).send('Product not found');
        }
        return next();
    } catch (error) {
        console.log(error);
    }
}