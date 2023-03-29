import { Router } from 'express'

const router = Router();

router.get('/login', (req, res) => {
    res.render("user/login");
});

router.get("/register", (req, res) => {
    res.render("user/register");
});

router.get("/", (req, res) => {
    res.render("user/profile", {
        user: req.session.user
    });
});

export default router;