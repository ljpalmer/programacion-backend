import express from "express";
import { messageModel } from "../../daos/mongo/message.mongo.js";

const CHAT = express.Router();

CHAT.get('/', async (req, res) => {
    try {
        let messages = await messageModel.find();    //Es async
        res.send({ result:"success", payload:messages});
    } catch (error) {
        console.log("No se pudo obtener los mensajes con mongoose: " + error);
        res.status(500).send({error: "No se pudo obtener los mensajes con mongoose: " , message: error});
    }
});

CHAT.post('/', async (res, req) => {
    try {
        let {user, message} = req.body;
        //validar entrada
        if(!user || !message) return res.status(400).send();
        let users = await messageModel.create({user, message}); //es async
        res.send({result: "succes", payload: users});
    } catch (error) {
        console.log("No se pudo registrar los mensajes con mongoose: " + error);     
        res.status(500).send({error: "No se pudo registrar los mensajes con mongoose: " , message: error});
    }
});
export default CHAT;