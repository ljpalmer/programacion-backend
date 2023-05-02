import userModel from "../../daos/mongo/user.mongo.js";

export default class UserService {
    constructor() {
        console.log("Working users with Database persistence in mongodb");
    }

    getAll = async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject());
    }

    save = async (user) => {
        return userModel.create(user);
    }

    findByUsername = async (username) => {
        return await userModel.findOne({email: username});
    };

    update = async (filter, value) => {
        console.log("Update user with filter and value:");
        console.log(filter);
        console.log(value);
        return await userModel.updateOne(filter, value);
    }
}