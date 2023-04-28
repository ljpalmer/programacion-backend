import Router from 'express';
import userModel from '../dao/models/users.model.js';
import { authToken } from '../util.js';

const USER = Router();

USER.get("/:userId", authToken,
async (req, res) =>{
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            res.status(202).json({message: "User not found with ID: " + userId});
        }
        res.json(user);
    } catch (error) {
        console.error("Error consultando el usuario con ID: " + userId);
    }
});


USER.get('/', async (req, res) => {
    try {
        let users = await userModel.find();    //Es async
        res.send({ result:"success", payload:users});
    } catch (error) {
        console.log("No se pudo obtener usuarios con mongoose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con mongoose: " , message: error});
    }
});

USER.post('/', async (res, req) => {
    try {
        let {first_name, last_name, email} = req.body;
        if(!first_name || !last_name || !email) return res.status(400).send();
        let users = await userModel.create({first_name, last_name, email}); //es async, ejemplo profesor
        res.send({result: "succes", payload: users});
    } catch (error) {
        console.log("No se pudo obtener usuarios con mongoose: " + error);     
        res.status(500).send({error: "No se pudo obtener usuarios con mongoose: " , message: error});
    }
});


USER.post('/logout', async (res, req) => {
  req.session.destroy( error => {
    if(error){

    }
  });    
});

USER.post('/register', async (res, req) => {
    req.session.destroy( error => {
      if(error){
        
      }
    });    
  });

export default USER;