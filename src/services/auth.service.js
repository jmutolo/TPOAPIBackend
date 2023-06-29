require("dotenv").config();
const bcrypt = require("bcrypt");
const UsuariosModel = require("../models/Usuarios");

class AuthService {
    async hasValidCredentials(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, process.env.SALT);
            const user = await UsuariosModel.findOne({username});

            if (user && hashedPassword === user.password) {
                return true;
            }

            return false;
        } catch (err) {
            console.error(err);
            throw new Error("Error in credentials validation");
        }
    }
}

module.exports = new AuthService();