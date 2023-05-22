import mongoose from 'mongoose';
import config from '../../config/config.js';
export let Orders;
switch(config.persistence){
    case "MONGO":
        const connection = mongoose.connect(config.mongoUrl);
        const {default:OrdersMongo} = await import('server/src/daos');
        Orders = OrdersMongo;
        break;
    case "MEMORY":
        const {default: OrdersMemory} = await import('server/src/daos');
        Orders = OrdersMemory;
        break;
}