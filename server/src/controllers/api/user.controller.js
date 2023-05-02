import UserService from '../../services/db/user.service.js'
class UserApiController {
    async getUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await UserService.findById(userId);
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

            const user = await UserService.create(userData);
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

            const user = await UserService.update(userId, updatedData);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await UserService.delete(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserApiController;