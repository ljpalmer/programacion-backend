import mongoose from 'mongoose';
export let Users;
switch(config.persistence){
    case "MONGO":
        const connection = mongoose.connect("MONGO_KEY");
        const {default:UsersMongo} = await import('');
        Users = UsersMongo;
        break;
    case "MEMORY":
        const {default: UsersMemory} = await import('');
        Users = UsersMemory;
        break;
}
