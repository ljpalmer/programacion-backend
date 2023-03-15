import mongose from 'mongoose';

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

export const productsModel = mongose.model(productsCollection, productsSchema);