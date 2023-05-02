import mongoose from 'mongoose';
export let Users;
switch(config.persistence){
    case "MONGO":
        const connection = mongoose.connect("mongodb+srv://lpalmerg:Probando1985@cluster0.8blfl16.mongodb.net/ecommerce");
        const {default:UsersMongo} = await import('');
        Users = UsersMongo;
        break;
    case "MEMORY":
        const {default: UsersMemory} = await import('');
        Users = UsersMemory;
        break;
}