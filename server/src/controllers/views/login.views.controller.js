import { request } from "express";
import config  from '../../config/config.js'
export default class LoginViewsController {
    loginRender = (req = request, res)=>{
        res.render('user/login')
    }

    registerRender = (req = request, res)=>{
        res.render('user/register')
    }

    failLoginRender = (req = request, res)=>{
        res.send({status: 'error', message: 'Login failed'})
    }

    failRegisterRender = (req = request, res)=>{
        res.send({status: 'error', message: 'Register failed'})
    }

    loginVoid = (req = request, res)=>{
        const { username, password } = req.body
        try {
            console.log("Probando el registro de session");
            if (username !== config.adminName || password !== config.adminPassword) {
                req.session.user = username;
                req.session.email = username;
                req.session.admin = false;
                req.session.usuario = true;
                req.logger.info('Role user detected');
                console.log('Role user detected');
                res.redirect('http://localhost:9090/products');
            } else {
                req.session.user = username;
                req.session.email = username;
                req.session.admin = true;
                req.session.usuario = false;
                req.logger.info('Role admin detected');
                console.log('Role admin detected');
                res.redirect('http://localhost:9090/products');
            }
        } catch (error) {
            console.log(error)
        }
    }

    registerVoid = (req = request, res)=>{
        try {
            res.redirect('http://localhost:9090/users/login')
        } catch (error) {
            console.log(error)
        }
    }

    logoutVoid = (req = request, res)=>{
        try {
            req.session.destroy(err => {
                if(!err) res.redirect('http://localhost:9090/users/login')
                else res.send({status:'Logout error', message: err})
            })
        } catch (error) {
            console.log(error)
        }
    }

    githubcallback = (req = request, res)=>{
        req.logger.info('req: ',req.user)
        console.log('req: ',req.user)
        req.session.user = req.user.first_name
        req.session.email = req.user.email
        req.session.admin = false
        req.session.usuario = true
        res.redirect('http://localhost:9090/products')
    }
}

//export default LoginController