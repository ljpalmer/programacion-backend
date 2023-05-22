import CustomError from "../utils/customError.util.js";
import errorTypes from "../utils/errorTypes.util.js";
import {generateProductErrorInfo} from "../utils/errorInfo.util.js";

export function InputValidation (req, res, next){
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    console.log(req.body)
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {

        CustomError.createError({
            name: 'product creation error',
            cause: generateProductErrorInfo({ title, description, code, price, status, stock, category, thumbnail }),
            message: 'Error trying to create a new product',
            code: errorTypes.INVALID_PROPERTIES
        })

        return res.status(401).send('Input invalid')
    }
    return next()
}