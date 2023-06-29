let instance = null;
require('dotenv').config();
const jwt = require("jsonwebtoken");
//const UsuariosService = require("../services/usuarios.service");
const UsuariosModel = require("../models/Usuarios");
const AuthService = require('../services/auth.service');
const UsuariosService = require("../services/usuarios.service");
const Usuarios = require('../models/Usuarios');

class UsuariosController {
    static getInstance() {
        if(!instance) {
            return new UsuariosController();
        }
        return instance;
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            let isUserRegistered = await AuthService.hasValidCredentials(username, password);
            if(isUserRegistered) {
                //const user = await UsuariosModel.findOne({username});
                const user = await UsuariosService.buscarUsuarioRegistrado(username);

                const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
                    expiresIn: "1d",
                });

                return res.status(200).json({
                    status: 200,
                    token,
                    message: "Token created successfully"
                });
            } else {
                return res.status(401).json({
                    message: "Unauthorized.",
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "login",
                message: err.message,
            });
        } 
    }

    async createUsuario(req, res) {
        try {
            let newUser = await UsuariosService.createUser(req.body);

            return res.status(201).json({
                message: "Usuario Creado!",
                usuario: newUser,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "createUsuario",
                message: err.message,
            });
        }
    }

    async existeUnUsuario(req, res) {
        try {
            let existe = await UsuariosService.existeUnUsuario();

            if(existe) {
                return res.status(200).json({
                    status: 200,
                    message: "Existe un usuario registrado",
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "No existe un usuario registrado",
                })
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "existeUnUsuario",
                message: err.message,
            });
        }
    }

}

module.exports = UsuariosController.getInstance();