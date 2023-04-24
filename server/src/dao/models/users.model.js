import mongose from 'mongoose';

const collection = 'users';

const schema = new mongose.Schema({
    first_name: String,
    last_name: String,
    email : {
        type: String,
        unique: true
    },
    age:Number,
    password: String,
    carts: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'carts'
      },
    role : String
});

schema.pre('findOne', function() {
    this.populate("carts.carts");
});

const userModel = mongose.model(collection, schema);
export default userModel;