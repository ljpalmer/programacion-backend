import mongoose from 'mongoose';
import config from '../../config/config.js';
export let Products;
switch(config.persistence){
    case "MONGO":
        const connection = mongoose.connect(config.mongoUrl);
        const {default:ProductsMongo} = await import('server/src/daos');
        Products = ProductsMongo;
        break;
    case "MEMORY":
        const {default: ProductsMemory} = await import('server/src/daos');
        Products = ProductsMemory;
        break;
}