import ProductRepository from "../../repositories/product.repository.js"
import ProductDTO from "../../daos/dtos/product.dto.js";

const productRepository = new ProductRepository();
export default class ProductService {
    constructor() {
        console.log("Working products with Database persistence in mongodb");
    }

    async getProducts(limit){
        let products = productRepository.getProducts(limit);
        return products.map(product => new ProductDTO(product));
    }

    async getProductById(pid){
        const product = await productRepository.getProductById(pid);
        return product ? new ProductDTO(product) : null;
    }

    async addProduct(title, description, price, thumbnail, code, stock, status, category){
        let product = await productRepository.addProduct(title, description, price, thumbnail, code, stock, status, category);
        console.log("Product: ",product);
        return await productRepository.addProduct(product);
    }

    async updateProduct(pid, productData){
        const productDTO = new ProductDTO(productData);
        return await productRepository.updateProduct(pid, productDTO);
    }

    async deleteProduct(pid){
        return await productRepository.deleteProduct({_id : pid})
    }
}