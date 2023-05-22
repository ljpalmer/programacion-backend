import ProductModel from '../daos/mongo/product.mongo.js';

export default class ProductsDAO{

    async addProduct(product){
        try {
            await ProductModel.create(product)
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(limit, page, filtro){
        try {
            let products = await ProductModel.paginate(filtro, {limit: 10, page: page, lean: true})
            // console.log(products)
            if (!limit) {
                return products
            }
            return products = await ProductModel.paginate(filtro, {limit: limit, page: page, lean: true})
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(pid){
        try {
            const data = await ProductModel.find()

            return data.find(product => product.id === pid)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, obj){
        try {
            await ProductModel.findOneAndReplace({_id: pid}, obj)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid){
        try {
            await ProductModel.findOneAndDelete({_id: pid})
        } catch (error) {
            console.log(error)
        }
    }
}