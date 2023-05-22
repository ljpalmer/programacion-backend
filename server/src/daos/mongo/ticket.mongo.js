import mongoose from 'mongoose';

const collection = 'tickets'

const schema = new  mongoose.Schema({
    code: {
        type: String
    },
    purchase_datetime: {
        type:  String
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        require: true
    }
})
const ticketModel = mongoose.model(collection, schema);

export default ticketModel;