import passport from "passport"
import { Router } from "express"
import { userValidation } from "../../middleware/userValidation.js"
import LoginViewsController from "../../controllers/views/login.views.controller.js";

const router = Router()

const loginViewsController = new LoginViewsController();

// Client ID: Iv1.b6ac1a5f856717dc
// Secrect Client : de3844f079b2117ee877294638dd6e0d6d5ef1b2

router.get('/login', loginViewsController.loginRender)

router.get('/register', loginViewsController.registerRender)

router.post('/login', passport.authenticate('login', {failureRedirect: '/users/faillogin'}), loginViewsController.loginVoid)

router.get('/faillogin', loginViewsController.failLoginRender)

router.post('/register', userValidation, passport.authenticate('register', {failureRedirect: '/users/failregister'}), loginViewsController.registerVoid)

router.get('/failregister', loginViewsController.failRegisterRender)

router.post('/logout', loginViewsController.logoutVoid)

router.get('/github', passport.authenticate('github',{scope: ['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), loginViewsController.githubcallback)

export default router
// import { Router } from 'express'
// import { passportCall } from '../../jwt.util.js';
//
// const router = Router();
//
// router.get('/login', (req, res) => {
//     res.render("user/login");
// });
//
// router.get("/register", (req, res) => {
//     res.render("user/register");
// });
//
// router.get("/", //authToken, //usando authentication bearer token
//             passportCall('jwt'), //usando jwt por cookie
//             (req, res) => {
//                 res.render("user/profile", {user: req.user});
// });
//
// export default router;