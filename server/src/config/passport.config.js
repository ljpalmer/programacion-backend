import passport from 'passport';
import passportLocal from 'passport-local';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../util.js';
import GitHubStrategy from 'passport-github2'

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
    /**
     * Inicializamos la estrategia local, username sera para nosotros email.
     * Done sera nuestro callback
     **/
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try {
                const exists = await userModel.findOne({email});
                if(exists){
                    console.log('El usuareio ya existe');
                    return done(null , false);
                }
                console.log("El usuario ya existe");
                const user = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password)
                    };
                    const result = await userModel.create(user);
                    //Todo Ok
                    return done(null, result);
                }            
          catch (error) {
                return done("Error registrando el usuario: " + error);
            } 
           }
    ));
    /**
     * Inicializamos la estrategia GitHub
     * Done sera nuestro callback
     **/
    //Estrategia de login para GitHub:
    passport.use('github', new GitHubStrategy({
        clientID: "REPLACE_ID",
        clientSecret: "REPLACE_SECRET",
        callbackUrl: "http://localhost:9090/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            console.log("Profile obtenido del usuario:");
            console.log(profile);
            let user = await userModel.findOne({email: profile._json.email});
            if(!user){
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
            }else{
                done(null, user);
            }            
        } catch (error) {
            done(error);
        }
    }));

    passport.use('login', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done)=> {
            try {
                const user = await userModel.findOne({email:username});
                console.log("Usuario encontrado para login:");
                console.log(user);

                if(!user){
                    console.warn("Usuario no existe con username: "+ username);
                    return done(null, false);
                }
                if(!isValidPassword(user, password)){
                    console.warn("Credenciales invalidas para user: "+ username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }));

    //Funciones de serializacion  y desserilizacion
    passport.serializeUser(async (id, done) => {    
        let user = await userModel.findById(id);
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

export default initializePassport;