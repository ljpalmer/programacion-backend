import { Router } from 'express'
import { passportCall } from '../../util.js';

const router = Router();

router.get('/login', (req, res) => {
    res.render("user/login");
});

router.get("/register", (req, res) => {
    res.render("user/register");
});

router.get("/", //authToken, //usando authentication bearer token
            passportCall('jwt'), //usando jwt por cookie
            (req, res) => {
                res.render("user/profile", {user: req.user});
});

export default router;