export function auth (req, res, next){
    console.log(req.session);
    if (req.session?.usuario || req.session?.admin ) {
        return next()
    }
    return res.status(401).send('Inicie Sesion')
}