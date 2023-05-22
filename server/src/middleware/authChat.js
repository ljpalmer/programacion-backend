export function authChat (req, res, next){
    if (req.session?.usuario) {
        return next()
    }
    return res.status(401).send('No tiene acceso a esta vista como administrador.')
}