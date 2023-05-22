import mongoose from "mongoose";
import config from "./config.js";

export default class MongoSingleton {
    static #instance;

    constructor() {
        //if (this.instance) {
        //    return MongoSingleton.instance;
        //}
        //MongoSingleton.instance = this;
        this.#connectMongoDB();
    };

    static getInstance(){
        if (this.#instance) {
            console.log("Already open a connection with MongoDB.");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

    async #connectMongoDB() {
        try {
            console.log(config.mongoUrl);
            await mongoose.connect(config.mongoUrl);
            console.log("Connected successfully  with MongoDB using Moongose.");
        } catch (error) {
            console.log("Conexion: " + config.mongoUrl);
            console.error("Can't connect to the BD using Moongose: " + error);
            process.exit();
        }
    };
};