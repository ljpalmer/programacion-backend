import mongose from 'mongoose';
import  mongoosePaginate  from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productsSchema = new mongose.Schema({
    title: String,
    description: String,
    code : String,
    price : Number,
    status: String,
    stock: Number,
    category: String,
    thumbnail: String,
    id: Number
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongose.model(productsCollection, productsSchema);