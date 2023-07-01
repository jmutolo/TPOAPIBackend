const UsuariosModel = require('../models/Usuarios');
const bcrypt = require('bcrypt');

class UsuariosService {

    async isUsuario(username) {
        try {
            let isUsuarioReg = await UsuariosModel.exists({username});
            if(isUsuarioReg){
                return true;
            }
            return false;
        }
        catch (err) {
            console.error(err);
            throw new Error("Error en isUsuario service");
        }
    }

    async createUser(user) {
        try{
            
            const count = await UsuariosModel.countDocuments({});
            
            if(count != 0){
                throw new Error("Usuario ya registrado");
            } 
            else {
                user.password = bcrypt.hashSync(user.password, process.env.SALT);
                await UsuariosModel.create(user);
                return user;
            }
        }
        catch (err) {
            console.error(err);
            throw new Error("Error in createUser service");
        }
    }

    async buscarUsuarioRegistrado(username) {
        try {
            let usuario = await UsuariosModel.findOne({username});
            return usuario;
        }
        catch(err) {
            console.error(err);
            throw new Error("Error en buscarUsuarioRegistrado service");
        }
    }

    async existeUnUsuario() {
        try {
            const count = await UsuariosModel.countDocuments({});
            if(count > 0) {
                return true;
            } else {
                return false;
            }
        }
        catch (err) {
            console.error(err);
            throw new Error("Error en existeUnUsuario service");
        }
    }

}

module.exports = new UsuariosService();