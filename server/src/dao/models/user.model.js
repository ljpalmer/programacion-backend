import mongose from 'mongoose';

const collection = 'usuarios';

const schema = new mongose.Schema({
    first_name: String,
    last_name: String,
    email : {
        type: String,
        unique: true
    },
    age:Number,
    password: String, //Se deja plano por el momento    
    role : String
});

export const userModel = mongose.model(collection, schema);