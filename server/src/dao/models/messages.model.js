import mongose from 'mongoose';

const messageCollection = 'messages';

const messageSchema = new mongose.Schema({
    user: String,
    message: String
});

export const messageModel = mongose.model(messageCollection, messageSchema);