import Router from 'express';
import UserController from '../../controllers/api/user.controller.js'
import { authToken } from '../../utils/jwt.util.js';

const USER = Router();
const USER_CONTROLLER = UserController;
USER.get("/:userId", authToken,
async (req, res) =>{
    const userId = req.params.userId;
    try {
        const user = await USER_CONTROLLER.findById(userId);
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
        let users = await USER_CONTROLLER.find();    //Es async
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
        let users = await USER_CONTROLLER.create({first_name, last_name, email}); //es async, ejemplo profesor
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