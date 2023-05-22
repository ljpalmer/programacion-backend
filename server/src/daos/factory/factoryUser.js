import mongoose from 'mongoose';
import config from '../../config/config.js';
export let Users;
switch(config.persistence){
    case "MONGO":
        const connection = mongoose.connect(config.mongoUrl);
        const {default:UsersMongo} = await import('server/src/daos');
        Users = UsersMongo;
        break;
    case "MEMORY":
        const {default: UsersMemory} = await import('server/src/daos');
        Users = UsersMemory;
        break;
}