import {fileURLToPath} from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        return res.status(401).send({error: "User not authenticated or missing token"});
    }
    const token = authHeader.split(' ')[1];//Split to take Bearer

    jwt.verify(token, PRIVATE_KEY, (error, credentials)=> {
        if(error) return res.status(403).send({error: "Token invalid, Unauthorized!"});

        req.user = credentials.user;
        next();
    });
}

export const authorization = (role) => {
    return async(req, res, next) => {
        if(!req.user) return res.status(401).send("Unauthorized: User not found in JWT");
        if(req.user.role !== role){
            return res.status(401).send("Unauthorized: User not found in JWT");
        }
        next();
    }
}

export default __dirname;
