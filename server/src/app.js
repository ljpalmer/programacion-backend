import express, { request } from 'express';
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import chatRouter from './routes/api/chats.router.js'
import loginRouter from './routes/api/login.router.js'
import handlebars from 'express-handlebars' 
import __dirname from './utils/jwt.util.js'
import viewRouter from './routes/views/views.router.js'
import loginViewsController from './routes/views/users.views.router.js'
import loginController from './routes/api/login.router.js'
import sessionsRouter from './routes/api/sessions.router.js'
import jwtRouter from './routes/api/jwt.router.js'
import configureSocket from './socket/configure-socket.js';
import configureHandlebars from './middleware/hbs.middleware.js';
import config from './config/config.js'
import session from 'express-session';
import MongoStore from 'connect-mongo'
//passport imports
import passport from 'passport';
import initializePassport  from './config/passport.config.js';
import githubLoginViewRouter from './routes/views/github-login.views.router.js'
import cookieParser from 'cookie-parser'
import MongoSingleton from "./config/mongodb-singleton.js";
import cors from 'cors';
import errorHandler from "./middleware/errorHandler.js";

const APP = express();
//const FILE_STORAGE = FileStore(session);

APP.engine('handlebars', handlebars.engine());
APP.set('view engine', 'handlebars');
APP.use(express.json());
APP.use(express.urlencoded({extended:true}));
APP.use(cors());
//Carpeta public
APP.use(express.static(__dirname + "/public"));
APP.use(session({
    store: MongoStore.create({mongoUrl: config.mongoUrl
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

APP.use(errorHandler);
//Declare Routers:
APP.use('/api/product', productsRouter);
APP.use('/api/cart', cartsRouter);
APP.use('/api/chat', chatRouter);
APP.use('/api/user', loginRouter);

APP.use("/", viewRouter);

APP.use("/users", loginViewsController);
APP.use('/api/sessions', sessionsRouter);
//APP.use('/api/jwt', jwtRouter);
APP.use('/api/login', loginController);
APP.use("/github", githubLoginViewRouter);

configureHandlebars(APP);

const SERVER_PORT = config.port;

const HTTP_SERVER = APP.listen(SERVER_PORT, () => console.log('Listening on PORT: '+ SERVER_PORT));

configureSocket(HTTP_SERVER);

const mongoInstance = async () => {
    try {
        //const singleton = await MongoSingleton.getInstance();
        await MongoSingleton.getInstance();
        ///await singleton.connectMongoDB();
    }catch (error){
        console.error(error);
    }
};

mongoInstance();