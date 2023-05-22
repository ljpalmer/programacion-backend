import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from "mongoose";

const collection = 'orders';

const PurchaseDateSchema = new mongoose.Schema({
    number: {type: String, require: true},
    day: {type: String, require: true},
    month: {type: String, require: true},
    year: {type: String, require: true},
});

const schema = new mongoose.Schema({
    products: {
        type: [{
            type: {
                type: mongoose.SchemaTypes.ObjectId, ref: 'products'
            }
        }, {quantity: Number}], require: true
    },
    state: {type: String, require: true, default: "Generada"},
    buyer_email: {type: String, require: true},
    purchase_date: {type: PurchaseDateSchema, require: true},
    total: {type: Number, require: true},
}, {
    timestamps: true,
});

schema.plugin(mongoosePaginate);
export const ordersModel = mongoose.model(collection, schema);