import passport from 'passport';
import userModel from '../daos/mongo/user.mongo.js';
import {PRIVATE_KEY,createHash,isValidPassword} from '../util.js';
import GitHubStrategy from 'passport-github2'
import config from "./config.js";
import jwtStrategy from 'passport-jwt'

const JwtStrategy = jwtStrategy.Strategy;
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
            console.log("Profile obtenido del usuario:");
            console.log(profile);
            let user = await userModel.findOne({
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
                let result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
};

const cookieExtractor = req => {
    let token = null;
    console.log("Entrando a Cookie Extractor");
    if (req && req.cookies) { //Validamos que exista el request y las cookies.
        console.log("Cookies presentes: ");
        console.log(req.cookies);
        token = req.cookies['jwtCookieToken'];
        console.log("Token obtenido desde Cookie:");
        console.log(token);
    }
    return token;
};

export default initializePassport;