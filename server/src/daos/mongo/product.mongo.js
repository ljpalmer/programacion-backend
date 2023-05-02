import mongoose from 'mongoose';
import  mongoosePaginate  from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
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

export const productsModel = mongoose.model(productsCollection, productsSchema);