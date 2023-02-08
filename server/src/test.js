// import express from "express"

// const APP = express();

const HTTP = require('http');

const SERVER = HTTP.createServer((request, response) => {
    response.end("¡Hola Mundo!");
});

const SERVER_PORT = 9090;

// APP.get("/bienvenida", (request, response) => {
//     response.end(JSON.stringify(user));
// });

const user = {
    nombre: 'Joe',
    apellido: 'Jonas',
    edad: 30,
    email: 'jjonas@roton.com'
};

SERVER.listen(SERVER_PORT, () => {
    console.log("Listening on port " + SERVER_PORT);
});