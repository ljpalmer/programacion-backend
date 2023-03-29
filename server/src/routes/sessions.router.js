import {Router} from 'express'
import {userModel} from '../dao/models/user.model.js'

const router = Router();

router.post("/register", async (req, res ) =>{
    const {first_name, last_name, email, age, password} = req.body;
    console.log("registrando Usuario");
    console.log(req.body);
    const role = "usuario";
    const exists =await userModel.findOne({email});
    if(exists){
        return res.status(400).send({estatus: "error", mensaje: "Usuario ya existe"});
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password,
        role
    };    

    const result = await userModel.create(user);

    res.status(201).send({status: "success", message: "Usuario creado con exito con ID: " + result.id});
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = {};

    if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
        user.first_name = "Coder";
        user.last_name = "House";
        user.age = "100";
        user.role = "admin";
    }else{
        user = await userModel.findOne({email, password});
        if(!user) return res.status(401).send({status:"error", error: "Incorrect credentials"});
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role : user.role
    };
    res.send({status:"success", payload: req.session.user, message:"¡Primer logueo realizado!"});
});

router.post("/logout", async (req, res) => {
    req.session.destroy(err => {
        if(!err) res.status(200).send("Logout ok!");
        else res.send({status: "Logout Error", body: err})
    })
});

export default router;