import UsersDAO from '../daos/users.dao.js'
import UserDTO from "../daos/dtos/user.dto.js";
export default class UserRepository {
    constructor() {
        this.userDAO = new UsersDAO();
    }
    async getAllUsers(){
        try {
            return this.userDAO.getAllUsers();
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo cargar los usuarios');
        }
    }
    async getUserById(userId) {
        try {
            return  await this.userDAO.getUserById(userId);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo encontrar al usuario');
        }
    }
    async findByUsername(email){
        try {
            return await this.userDAO.findByUsername(email);
            //return !!user;
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo encontrar al usuario');
        }
    }
    async create(userData) {
        try {
            return this.userDAO.createUser(userData);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo crear el usuario');
        }
    }
    async update(userId, updatedData) {
        try {
            return await this.userDAO.updateUser(userId, updatedData);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo actualizar el usuario');
        }
    }
    async delete(userId) {
        try {
            return await this.userDAO.deleteUser(userId);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo eliminar el usuario');
        }
    }
}
//module.exports = new UserRepository();