import passport from 'passport';
//import userModel from '../daos/mongo/user.mongo.js';
import {PRIVATE_KEY} from '../utils/jwt.util.js';
import { createHash, isValidPassword} from '../utils/bcrypt.util.js'
import GitHubStrategy from 'passport-github2'
import local from "passport-local";
import config from "./config.js";
import jwtStrategy from 'passport-jwt'
import UsersDAO from "../daos/users.dao.js";
import CartsDAO from "../daos/carts.dao.js";

const JwtStrategy = jwtStrategy.Strategy;
const LocalStrategy = local.Strategy;
const usersDAO = new UsersDAO();
const cartsDAO = new CartsDAO();
const ExtractJWT = jwtStrategy.ExtractJwt;
const initializePassport = () => {
    /**
     * Inicializamos la estrategia local, username sera para nosotros email.
     * Done sera nuestro callback
     **/
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (err) {
            return done(err);
        }
    }));
    /**
     * Inicializamos la estrategia GitHub
     * Done sera nuestro callback
     **/
    passport.use('github', new GitHubStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackUrl: "http://localhost:9090/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Profile getting from user:");
            console.log(profile);
            let user = await usersDAO.findByUsername({
                email: profile._json.email
            });
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: '',
                    loggedBy: "GitHub"
                };
                let result = await usersDAO.createUser(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }));

    passport.use('login', new LocalStrategy(
        {
            usernameField: 'username'
        },
        async (req, username, password, done) => {
            req.logger.info('Login Passport');
            console.log('Login Passport');
            try {
                console.log("UserName: " + username);
                let user = await usersDAO.findByUsername(username);
                req.logger.info(user);
                console.log(user);
                if (!user) {
                    console.log('User does not exist');
                    return done(null, false);
                }

                if(!isValidPassword(user, password)){
                    console.log('Invalid input data');
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    ));

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req, username, password, done)=>{
            const { first_name, last_name, age, roll = 'user', email } = req.body
            console.log('username: ',username);
            console.log('password: ',password);
            try {

                let exist = await usersDAO.findByUsername(username)

                if(exist) {
                    console.log('User already exists');
                    return done(null, false);
                }else{
                    let cart = await cartsDAO.createCart();

                    let user = { first_name, last_name, age, roll, email, cart: cart._id, password: createHash(password) }

                    let result = await usersDAO.createUser(user)

                    console.log('The user created successfully: ', result)
                    return done(null, result);
                }
            } catch (error) {
                console.log(error)
                return done('Error getting the user '+error)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await usersDAO.getUserById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializing the user: " + error);
        }
    });
};

const cookieExtractor = req => {
    let token = null;
    console.log("Entering Cookie Extractor");
    if (req && req.cookies) { //Validamos que exista el request y las cookies.
        console.log("Cookies: ");
        console.log(req.cookies);
        token = req.cookies['jwtCookieToken'];
        console.log("Token getting the Cookie:");
        console.log(token);
    }
    return token;
};

export default initializePassport;