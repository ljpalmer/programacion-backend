import { Router } from "express"
import { InputValidation } from "../../middleware/validation.js"
import { roleAdminVerify } from "../../middleware/roleVerify.js"
import ProductsController from "../../controllers/api/product.controller.js"

const router = Router()

const productsController = new ProductsController();

router.get('/', productsController.getProducts);

router.get('/:pid', productsController.getProductById);

router.post('/', roleAdminVerify, InputValidation, productsController.addProduct);

router.put('/:pid', InputValidation, productsController.updateProduct);

router.delete('/:pid', productsController.delete);
export default router;