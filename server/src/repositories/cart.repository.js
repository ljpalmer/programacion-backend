import CartsDAO from '../daos/carts.dao.js';
export default class CartRepository {
    constructor() {
        this.cartDAO = new CartsDAO();
    }
    async createCart(){
        try {
            return await this.cartDAO.createCart({products: []})
        } catch (error) {
            console.log(error)
        }
    }

    async uploadProduct(cid, pid){
        try {
            let cart = await this.cartDAO.uploadProduct({_id: cid})

            let product = cart.products.find(product => product.pid === pid)
            // console.log(cid)
            // console.log(carrito)
            // console.log(product)
            if (product !== undefined) {
                await this.cartDAO.arrayProductsUpdate(
                    {
                        _id: cid
                    },
                    {
                        $set:
                            {
                                'products.$[pid]': {'pid': pid, 'quantity': product.quantity + 1}
                            }
                    },
                    {
                        arrayFilters:
                            [
                                {'pid.pid': pid}
                            ]
                    }
                )
            }

            if (product === undefined) {
                await this.cartDAO.getCartProducts(cid, {$push: {'products': {pid: pid, quantity : 1}}})
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getCartProducts(cid, limit, page){
        try {
            // console.log(cartProducts)
            return await this.cartDAO.paginate({_id: cid}, {limit: limit, page: page, lean: true})
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(cid, pid){
        try {
            let cart = await this.cartDAO.getCartProducts({cid: cid})

            let products = cart.products.filter(product => product.pid !== pid)

            console.log(products)

            // await this.cartDAO.findByIdAndUpdate(cid, products)

            await this.cartDAO.arrayProductsUpdate(
                {
                    cid: cid
                },
                {
                    $set:
                        {
                            'products': products
                        }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCartProducts(cid){
        try {
            let products = []

            await this.cartDAO.arrayProductsUpdate(
                {
                    _id: cid
                },
                {
                    $set:
                        {
                            'products': products
                        }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async arrayProductsUpdate(cid, data){
        try {
            await this.cartDAO.arrayProductsUpdate(
                {
                    _id: cid
                },
                {
                    $set:
                        {
                            'products': data
                        }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}