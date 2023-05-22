import { request } from "express";
import { generateProduct } from "../../utils/faker.util.js";

export default class MockingApiController{
    getMocks = async (req = request, res) => {
        let products = [];

        for (let i = 0; i < 100; i++) {
            let product = generateProduct();
            products.push(product);
        }
        res.send({
            status: 'ok',
            payload: products
        })
    }
}
//export default MockingApiController;