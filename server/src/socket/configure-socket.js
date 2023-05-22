import {Server} from 'socket.io';
import {messageModel} from '../daos/mongo/message.mongo.js';
import {productsModel} from '../daos/mongo/product.mongo.js';

import product from '../class/product/Product.js';
import Chat from '../class/chat/chat.js';

export default function configureSocket(httpServer) {
    const io = new Server(httpServer);
    io.on('connection', async (socket) => {
        socket.on('message', async (user) => {

            var userChat = new Chat(user.user, user.message);

            var data = new messageModel(userChat);
            await data.save();

            let messages = await messageModel.find();
            //console.log({messages});
            io.emit('messageLogs', messages);

        });

        socket.on('new_user', async (data) => {
            let messages = await messageModel.find();
            socket.emit('messageLogs', messages);
            socket
                .broadcast
                .emit('user_connected', data);
        });

        console.log("Nuevo cliente conectado.");

        socket.on("loadProducts", async (data) => {
            let products = await productsModel.find();
            socket.emit('listUpdateProducts', products);
        });

        socket.on("registerProduct", async (socket) => {

            let itemProduct = new product(
                socket.title,
                socket.description,
                socket.code,
                socket.price,
                socket.status,
                socket.stock,
                socket.category,
                socket.thumbnails
            );
            try {
                //console.log(itemProduct);

                var data = new productsModel(itemProduct);
                await data.save();
                console.log("Producto Guardado");

                let products = await productsModel.find();
                io.emit('listUpdateProducts', products);

            } catch (error) {
                console.log(error);
            }
        });

        socket.on("deleteProduct", async (socket) => {
            //console.log(socket);
            let id = socket.idproduct;

            const result = await productsModel.deleteOne({_id: id});
            //console.log(result);
            let products = await productsModel.find();
            io.emit('listUpdateProducts', products);
        });

    });

}