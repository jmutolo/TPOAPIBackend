const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuariosSchema = new Schema ({
    username:String,
    password:String,
});

const Usuarios = mongoose.model('Usuarios', UsuariosSchema);

module.exports = Usuarios;