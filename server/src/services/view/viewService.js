import CartsDAO from "../../daos/carts.dao.js";
import ProductsDAO from "../../daos/products.dao.js";

const cartsDAO = new CartsDAO();
const productsDAO = new ProductsDAO();

export default class ViewsService {
    async getProducts(limit, page, filtro) {
        return await productsDAO.getProducts(limit, page, filtro)
    }

    async getCartProducts(cid, limit, page) {
        return await cartsDAO.getCartProducts(cid, limit, page)
    }
}