import ProductsDAO from '../daos/products.dao.js'

export default class ProductRepository {
    constructor() {
        this.productDAO = new ProductsDAO();
    }

    async addProduct(product){
        try {
            await this.productDAO.create(product)
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(limit, page, filtro){
        try {
            let products = await this.productDAO.paginate(filtro, {limit: 10, page: page, lean: true})
            // console.log(products)
            if (!limit) {
                return products
            }
            return products = await this.productDAO.paginate(filtro, {limit: limit, page: page, lean: true})
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(pid){
        try {
            const data = await this.productDAO.find()

            return data.find(product => product.id === pid)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, obj){
        try {
            await this.productDAO.findOneAndReplace({_id: pid}, obj)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid){
        try {
            await this.productDAO.findOneAndDelete({_id: pid})
        } catch (error) {
            console.log(error)
        }
    }
}