import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user._doc.password}, password:'${password}'`);
    return bcrypt.compareSync(password, user._doc.password);
};
//JSON Web Token
export const PRIVATE_KEY = "CoderHouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn:'60s'});
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth");
    console.log(authHeader);
    if(!authHeader){
        return res.status(401).send({error: "User not authenticated or missiong token"});
    }
    const token = authHeader.split(' ')[1];//Split para retirar Bearer

    jwt.verify(token, PRIVATE_KEY, (error, credentials)=> {
        if(error) return res.status(403).send({error: "Token invalid, Unauthorized!"});

        req.user = credentials.user;
        next();
    });
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if(err) return next(err);
            if(!user){
                return res.status(401).send({error: info.messages?info.messages: info.toString()});
            }
            req.user = user;
            next();
        })(req,res,next);
    }
};

export const authorization = (role) => {
    return async(req, res, next) => {
        if(!req.user) return res.status(401).send("Unuthorizated: Usar not found in JWT");
        if(req.user.role != roles){
            return res.status(401).send("Unuthorizated: Usar not found in JWT");
        }
        next();
    }
}

export default __dirname;
