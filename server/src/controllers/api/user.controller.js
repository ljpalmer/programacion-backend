import UserService from '../../services/db/user.service.js'

const userService = new UserService();
export default class UserApiController {
    async getUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await userService.findById(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        const { first_name, email, password } = req.body;

        try {
            const userData = {
                first_name,
                email,
                password,
            };

            const user = await userService.create(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        const { userId } = req.params;
        const { name, email } = req.body;

        try {
            const updatedData = {
                name,
                email,
            };

            const user = await userService.update(userId, updatedData);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await userService.delete(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

//export default UserApiController;