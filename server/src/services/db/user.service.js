import UserRepository from "../../repositories/user.repository.js"
import UserDTO from "../../daos/dtos/user.dto.js";

//const userRepository = new UserRepository();
const userRepository = new UserRepository();
export default class UserService {
    constructor() {
        console.log("Working users with Database persistence in mongodb");
    }

    getAll = async () => {
        let users = await userRepository.getAllUsers();
        return users.map(user => new UserDTO(user));
    }

    create = async (userData) => {
        const userDTO = new UserDTO(userData);
        const user = await userRepository.create(userDTO);
        return user ? new UserDTO(user) : null;
    }

    findById = async (userId) => {
        const user= await userRepository.getUserById(userId);
        return user ? new UserDTO(user) : null;
    };

    findByUsername = async (email) => {
        const user = await userRepository.findByUsername( email );
        console.log("Encontrado: " + user);
        return user ? new UserDTO(user) : null;
    };

    update = async (filter, userData) => {
        console.log("Update user with filter and value:");
        //console.log(filter);
        const userDTO = new UserDTO(userData);
        console.log(userDTO);
        return userRepository.update(filter, userDTO);
    }

    delete = async (userId) => {
        return userRepository.delete({_id: userId});
    }
}