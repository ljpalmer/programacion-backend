import userModel from '../daos/mongo/user.mongo.js';

const UserModel = userModel();

class UsersDAO {
    async getAllUsers() {
        return UserModel.find();
    }

    async getUserById(userId) {
        return UserModel.findById(userId);
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

module.exports = UsersDAO;
