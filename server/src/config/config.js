import dotenv from 'dotenv';
import {Command} from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable for debug', false)
    .option('-p <port>', 'Server Port', 9090)
    .option('--mode <mode>', 'Working Mode', 'develop')
program.parse();

//console.log("Options: ", program.opts());
console.log("Mode Option: ", program.opts().mode);

const environment = program.opts().mode;
dotenv.config({
    path:environment === "production" ? "../../server/src/config/.env.production" : "../../server/src/config/.env.development"
});
export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    clientID : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    persistence : process.env.PERSISTENCE
};