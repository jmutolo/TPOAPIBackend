const { Router } = require("express");
const { check } = require("express-validator");
const usuariosController = require("../controllers/usuarios.controller");
const checkFields = require("../middlewares/validateFields");
const jwtValidator = require('../middlewares/jwtValidator');

const router = Router();

router.post("/", [
    check("username").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
],
usuariosController.login
); //LOGIN USUARIO

router.post("/register", [
    check("username").not().isEmpty(),
    check("password").not().isEmpty(),
], 
usuariosController.createUsuario
); //CREATE USUARIO

router.get("/existe", usuariosController.existeUnUsuario
);

router.get("/validar", jwtValidator, usuariosController.usuarioValidado
);

module.exports = router;