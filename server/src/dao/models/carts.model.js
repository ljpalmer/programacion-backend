// this.id = id;
// this.products = products;
import mongose from 'mongoose';

const cartCollection = 'messages';

const cartSchema = new mongose.Schema({
    id: Number,
    products: Object
});

export const cartModel = mongose.model(cartCollection, cartSchema);