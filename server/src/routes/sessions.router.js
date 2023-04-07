import {Router} from 'express'
import passport from 'passport';
import {userModel} from '../dao/models/user.model.js'
import  { createHash, isValidPassword } from '../util.js'

const router = Router();

router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/github");
});
// router.post("/register", async (req, res ) =>{
//     const {first_name, last_name, email, age, password} = req.body;        
//     const role = "usuario";
//     const exists = await userModel.findOne({email});
//     if(exists){
//         return res.status(400).send({estatus: "error", mensaje: "Usuario ya existe"});
//     }
//     const user = {
//         first_name,
//         last_name,
//         email,
//         age,
//         password: createHash(password),
//         role
//     };    

//     const result = await userModel.create(user);

//     res.status(200).send({status: "success", message: "Usuario creado con exito con ID: " + result.id});
// });

router.post("/register", passport.authenticate('register',{failureRedirect: '/fail-register'})
    , async (req, res ) =>{
    console.log("Registrando nuevo usuario");
    res.status(200).send({status: "success", message: "Usuario creado con exito"});
});

// router.post("/login", async (req, res) => {
//     const {email, password} = req.body;
//     const user = {};    
//     if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
//         user.first_name = "Coder";
//         user.last_name = "House";
//         user.age = "100";
//         user.role = "admin";
//     }else{        
//         // user = await userModel.findOne({email});            
//         Object.assign(user,await userModel.findOne({email}));   
//         console.log(user); 
//         if(!user) return res.status(401).send({status:"error", error: "Incorrect credentials"});
//         if(!isValidPassword(user, password)){
//             return res.status(401).send({status:"error", error: "El usuario y la contraseña no coinciden"});
//         }
//     }

//     req.session.user = {
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age,
//         role : user.role
//     };
//     res.send({status:"success", payload: req.session.user, message:"¡Primer logueo realizado!"});
// });

router.post("/login", passport.authenticate('login', {failureRedirect: '/api/sessions/fail-login'}), async (req, res) => {
    console.log("Usuario encontrado para login:");    
    const user = req.user;
    console.log(user);
    if(!user) return res.status(401).send({status: "error", error: "El usuario y la constraseña no coinciden"});
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role : user.role //Prueba
    };
    res.send({status:"success", payload: req.session.user, message:"¡Primer logueo realizado!"});
});

router.get("fail-register", (req, res) => {
    res.status(401).send({error: "Fallo al procesar el registro"});
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({error: "Fallo al procesar el login"});
});

router.post("/logout", async (req, res) => {
    req.session.destroy(err => {
        if(!err) res.status(200).send("Logout ok!");
        else res.send({status: "Logout Error", body: err})
    })
});

export default router;