import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    carts: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts'
    },
    role: String
});

schema.pre('findOne', function () {
    this.populate("carts.carts");
});

const userModel = mongoose.model(collection, schema);
export default userModel;