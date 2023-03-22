import mongose from 'mongoose';
import  mongoosePaginate  from 'mongoose-paginate-v2'

const cartCollection = 'carts';

const cartSchema = new mongose.Schema({    
    products: [{
        type: {
            type: mongose.Schema.Types.ObjectId,
            ref: 'products'
          },
        quantity: Number
    },
    {quantity: Number}]
});

cartSchema.plugin(mongoosePaginate);
export const cartModel = mongose.model(cartCollection, cartSchema);