import ErrorTypes from "../utils/errorTypes.util.js";

export default (error, req, res, next)=>{
    console.log(error.cause);
    switch (error.code) {
        case ErrorTypes.INVALID_PROPERTIES:
            res.send({status: 'error', error: error.name})
            break;

        default:
            res.send({status: 'error', error: 'Unhandled error'})
            break;
    }
}