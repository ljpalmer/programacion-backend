export default class OrderDTO{
    constructor(order){
        this.user = order.user;
        this.products = order.products;
    }
}