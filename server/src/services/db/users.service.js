import userModel from "../../dao/models/users.model.js";

export default class UserService {
    constructor() { 
        console.log("Working users with Database persistence in mongodb");
    }

    getAll = async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject());
    }
    save = async (user) => {
        let result = await userModel.create(user);
        return result;
    }

    findByUsername = async (username) => {
        const result = await userModel.findOne({email: username});
        return result;
    };

    update = async (filter, value) => {
        console.log("Update student with filter and value:");
        console.log(filter);
        console.log(value);
        let result = await studentsModel.updateOne(filter, value);
        return result;
    }
}