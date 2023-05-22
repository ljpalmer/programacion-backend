export function roleAdminVerify(req, res, next) {
    if (req.session?.admin) {
        return next()
    }
    return res.status(401).send('Usted no es admin')
}

export function roleUserVerify(req, res, next) {
    if (req.session?.usuario) {
        return next()
    }
    return res.status(401).send('Usted no es usuario')
}