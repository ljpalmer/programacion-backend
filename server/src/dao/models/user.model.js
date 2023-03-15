import mongose from 'mongoose';

const userCollection = 'usuarios';

const userSchema = new mongose.Schema({
    first_name: String,
    last_name: String,
    email : {
        type: String,
        unique: true,
        requires: [true, "Correo es requerido"]
    }
});

export const userModel = mongose.model(userCollection, userSchema);