import bcrypt from "bcrypt";

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    console.log(user);
    console.log(password);
    console.log(user.password);
    console.log(createHash(password));
    console.log(`Data to validate: user-password: ${user.password}, password:'${password}'`);
    return bcrypt.compareSync(password, user.password);
};