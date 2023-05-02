class UserRepository {
    constructor(dao) {
        this.UsersDAO = dao;
    }
    async findById(userId) {
        try {
            return  await this.UsersDAO.findById(userId);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo encontrar al usuario');
        }
    }

    async create(userData) {
        try {
            return this.UsersDAO.createUser(userData);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo crear el usuario');
        }
    }

    async update(userId, updatedData) {
        try {
            return await this.UsersDAO.findByIdAndUpdate(userId, updatedData, {new: true});
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo actualizar el usuario');
        }
    }

    async delete(userId) {
        try {
            return await this.UsersDAO.findByIdAndDelete(userId);
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo eliminar el usuario');
        }
    }
}

module.exports = new UserRepository();