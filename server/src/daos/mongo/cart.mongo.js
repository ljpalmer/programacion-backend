    import mongoose from 'mongoose';
    import  mongoosePaginate  from 'mongoose-paginate-v2'

    const collection = 'carts';

    const schema = new mongoose.Schema({
        products: [{
            type: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products'
            },
            quantity: Number
        },
        {quantity: Number}]
    });

    schema.plugin(mongoosePaginate);
    export const cartsModel = mongoose.model(collection, schema);
    export default cartsModel;