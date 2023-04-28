import {Router} from 'express';
import {isValidPassword,generateJWToken,createHash} from '../util.js';
import passport from 'passport';
//Service import
import UserService from '../services/db/users.service.js';

const router = Router();
const userService = new UserService();

router.get("/current", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    res.send(req.user);
});

router.post("/login", async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userService.findByUsername(email);
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(400).send({
                error: "Not found",
                message: "Usuario no encontrado con username: " + email
            });
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({
                status: "error",
                error: "El usuario y la contraseña no coinciden!"
            });
        }
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);
        //Con Cookie
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 120000,
            httpOnly: true
        });
        console.log("Cookie registrado");
        res.status(200).send({
            message: "Login successful!",
            jwt: access_token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: "error",
            error: "Error interno de la applicacion."
        });
    }
});

//Agregar metodo de registrar usuario:
router.post("/register", async (req, res) => {
    const {first_name,last_name,email,age,password} = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);
    const exists = await userService.findByUsername(email);
    if (exists) {
        return res.status(401).send({
            status: "error",
            message: "Usuario ya existe."
        });
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: 'user'
    };
    const result = await userService.save(user);
    res.status(201).send({
        status: "success",
        message: "Usuario creado con extito con ID: " + result.id
    });
});

export default router;