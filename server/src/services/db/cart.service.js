import CartRepository from "../../repositories/cart.repository.js";

const cartRepository = new CartRepository();

export default class CartService {
    async createCart() {
        return await cartRepository.createCart()
    }

    async getCartProducts(cid, limit, page) {
        return await cartRepository.getCartProducts(cid, limit, page);
    }

    async newProduct(cid, pid) {
        return await cartRepository.uploadProduct(cid, pid);
    }

    async deleteProduct(cid, pid) {
        return await cartRepository.deleteProduct(cid, pid);
    }

    async uploadProduct(cid, pid) {
        return await cartRepository.uploadProduct(cid, pid);
    }

    async deleteCartProducts(cid) {
        return await cartRepository.deleteCartProducts(cid);
    }

    async arrayProductsUpdate(cid, data) {
        return await cartRepository.arrayProductsUpdate(cid, data);
    }
}