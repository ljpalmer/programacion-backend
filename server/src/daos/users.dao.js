import UserModel from '../daos/mongo/user.mongo.js';

export default class UsersDAO {
    async getAllUsers() {
        return UserModel.find();
    }

    async getUserById(userId) {
        return UserModel.findById(userId);
    }

    async findByUsername(email) {
        return UserModel.findOne({ email: email.toString() });
    }
    async createUser(userData) {
        const newUser = new UserModel(userData);
        return newUser.save();
    }

    async updateUser(userId, userData) {
        return UserModel.findByIdAndUpdate(userId, userData, { new: true });
    }

    async deleteUser(userId) {
        return UserModel.findByIdAndDelete(userId);
    }
}

//module.exports = UsersDAO;
