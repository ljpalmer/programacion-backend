import Router from 'express';
import { userModel } from '../dao/models/user.model';


const ruoter = Router();

router.get('/', async (req, res) => {
    try {
        let users = await userModel.find();    //Es async
        res.send({ result:"success", payload:users});
    } catch (error) {
        console.log("No se pudo obtener usuarios con mongoose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con mongoose: " , message: error});
    }
});

router.post('/', async (res, req) => {
    try {
        let {first_name, last_name, email} = req.body;
        //validar entrada
        if(!first_name || !last_name || !email) return res.status(400).send();
        let users = await userModel.create({first_name, last_name, email}); //es async, ejemplo profesor
        res.send({result: "succes", payload: users});
    } catch (error) {
        console.log("No se pudo obtener usuarios con mongoose: " + error);     
        res.status(500).send({error: "No se pudo obtener usuarios con mongoose: " , message: error});
    }
});