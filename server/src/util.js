import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user._doc.password}, password:'${password}'`);
    return bcrypt.compareSync(password, user._doc.password);
};

export default __dirname;
