import {Router} from 'express'
import passport from 'passport';
import  { authToken, generateJWToken} from '../../utils/jwt.util.js'
//import  { createHash, isValidPassword } from '../../utils/bcrypt.jwt.util.js'
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

router.post("/register", passport.authenticate('register',{failureRedirect: '/fail-register'})
    , async (req, res ) =>{
    console.log("Registrando nuevo usuario");
    res.status(200).send({status: "success", message: "Usuario creado con exito"});
});

router.post("/login", passport.authenticate('login', {failureRedirect: '/api/sessions/fail-login'}), async (req, res) => {
    console.log("Usuario encontrado para login:");    
    const user = req.user;
    console.log(user);
    if(!user) return res.status(401).send({status: "error", error: "El usuario y la constraseña no coinciden"});
    const access_token = generateJWToken(user);
    console.log(access_token);
    res.send({status:"success", access_token: access_token});
});

router.get("current", authToken, (req,res) => {
    res.send({status: "success", user: req.user});
})

router.get("fail-register", (req, res) => {
    res.status(401).send({error: "Failed to process the register"});
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({error: "Failed to process the login"});
});

router.post("/logout", async (req, res) => {
    req.session.destroy(err => {
        if(!err) res.status(200).send("Logout ok!");
        else res.send({status: "Logout Error", body: err})
    })
});

export default router;