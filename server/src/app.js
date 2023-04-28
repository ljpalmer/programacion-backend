import express, { request } from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import userRouter from './routes/users.router.js'
import handlebars from 'express-handlebars' 
import __dirname from './util.js'
import viewRouter from './routes/views.router.js'
import usersViewRouter from './routes/users.views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import jwtRouter from './routes/jwt.router.js'
import configureSocket from './socket/configure-socket.js';
import configureHandlebars from './middleware/hbs.middleware.js';
import mongose from 'mongoose';
// import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo'
//passport imports
import passport from 'passport';
import initializePassport  from './config/passport.config.js';
import githubLoginViewRouter from './routes/github-login.views.router.js'
import cookieParser from 'cookie-parser'
const APP = express();

const MONGO_URL = "MONGO_CONNECTION_STRING";
//const FILE_STORAGE = FileStore(session);

APP.engine('handlebars', handlebars.engine());
APP.use(express.json());
APP.use(express.urlencoded({extended:true}));

//Carpeta public
APP.use(express.static(__dirname + "/public"));
//APP.use(cookieParser("KeySecret"));
APP.use(session({
    //store: new FILE_STORAGE({path: "./sessions", ttl: 15, retries: 0}),
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true},
        ttl:30
    }),
    secret: "KeySecret",
    resave: false,
    saveUninitialized: true
}));

APP.use(cookieParser("CoderS3cr3tC0d3"));
//Middleware Passport:
initializePassport();
APP.use(passport.initialize());
APP.use(passport.session());

//Declare Reouters:
APP.use('/api/product', productsRouter);
APP.use('/api/cart', cartsRouter);
APP.use('/api/chat', chatRouter);
APP.use('/api/user', userRouter);

APP.use("/", viewRouter);

APP.use("/users", usersViewRouter);
APP.use('/api/sessions', sessionsRouter);
APP.use('/api/jwt', jwtRouter);
APP.use("/github", githubLoginViewRouter);

configureHandlebars(APP);

const SERVER_PORT = 9090;

const HTTP_SERVER = APP.listen(SERVER_PORT, () => console.log('Listening on PORT: '+ SERVER_PORT));

configureSocket(HTTP_SERVER);

const connectMongoDB = async () => {
    try {
        await mongose.connect(MONGO_URL); //Cambiar por la cadena de conexion
        console.log("Conectado con exito a MongoDB usando Mongoose");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Mongoose " + error);
        process.exit;
    }
};

connectMongoDB();