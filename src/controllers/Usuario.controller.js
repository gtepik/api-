/*import Usuario from "../models/Usuarios.js";

const consulta = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const consulta_individual = async (req, res) => {
    try {
        const { usuario } = req.params;
        const usuarioEncontrado = await Usuario.findOne({ usuario });
        if (!usuarioEncontrado) {
            return res.status(404).json({ "msj": `No se encontró ningún usuario con el nombre de usuario ${usuario}.` });
        }
        res.json(usuarioEncontrado);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const insercionUsuario = async (req, res) => {
    try {
        const { nombre, usuario, email, rol, contrasena, ...otrosCampos } = req.body;

        if (Object.keys(otrosCampos).length > 0) {
            return res.status(400).json({ "msj": "Datos inválidos: se recibieron campos no permitidos." });
        }

        if (!nombre || !usuario || !email || !rol || !contrasena) {
            return res.status(400).json({ "msj": "Todos los campos (nombre, usuario, email, rol, contrasena) son obligatorios." });
        }

        const usuarioExistente = await Usuario.findOne({ usuario });
        if (usuarioExistente) {
            return res.status(400).json({ "msj": "El nombre de usuario ya está en uso." });
        }

        const usuarioNuevo = new Usuario({ nombre, usuario, email, rol, contrasena });
        await usuarioNuevo.save();
        res.status(201).json(usuarioNuevo);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { nombre, usuario, email, rol, contrasena } = req.body;
        const usuarioActual = req.params.usuario;

        const resultado = await Usuario.updateOne(
            { usuario: usuarioActual },
            { $set: { nombre, usuario, email, rol, contrasena } }
        );

        if (resultado.modifiedCount === 0) {
            const usuarioNuevo = new Usuario({ nombre, usuario, email, rol, contrasena });
            await usuarioNuevo.save();
            return res.status(201).json({ msj: "Usuario no encontrado, se creó uno nuevo", usuario: usuarioNuevo });
        }

        res.status(200).json({ msj: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { usuario } = req.params;
        const usuarioEliminado = await Usuario.findOneAndDelete({ usuario });

        if (!usuarioEliminado) {
            return res.status(404).json({ "Mensaje": `No se encontró el usuario con nombre de usuario ${usuario}.` });
        }

        res.status(200).json({ "Mensaje": `Usuario ${usuario} eliminado correctamente.` });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

export {
    consulta,
    consulta_individual,
    insercionUsuario,
    actualizarUsuario,
    eliminarUsuario,
};*/

// filepath: c:\Users\elfla\OneDrive\Escritorio\nosgl1\src\controllers\Usuario.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from "../models/Usuarios.js";

const consultas = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const consulta_individuales = async (req, res) => {
    try {
        const { usuario } = req.params;
        const usuarioEncontrado = await Usuario.findOne({ usuario });
        if (!usuarioEncontrado) {
            return res.status(404).json({ "msj": `No se encontró ningún usuario con el nombre de usuario ${usuario}.` });
        }
        res.json(usuarioEncontrado);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const insercionUsuario = async (recibido, respuesta) => {
    try {
        const { nombre, usuario, email, rol, contrasena, ...otrosCampos } = req.body;

        if (Object.keys(otrosCampos).length > 0) {
            return res.status(400).json({ "msj": "Datos inválidos: se recibieron campos no permitidos." });
        }

        if (!nombre || !usuario || !email || !rol || !contrasena) {
            return res.status(400).json({ "msj": "Todos los campos (nombre, usuario, email, rol, contrasena) son obligatorios." });
        }

        const usuarioExistente = await Usuario.findOne({ usuario });
        if (usuarioExistente) {
            return res.status(400).json({ "msj": "El nombre de usuario ya está en uso." });
        }

        const usuarioNuevo = new Usuario({ nombre, usuario, email, rol, contrasena });
        await usuarioNuevo.save();
        res.status(201).json(usuarioNuevo);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { nombre, usuario, email, rol, contrasena } = req.body;
        const usuarioActual = req.params.usuario;

        const resultado = await Usuario.updateOne(
            { usuario: usuarioActual },
            { $set: { nombre, usuario, email, rol, contrasena } }
        );

        if (resultado.modifiedCount === 0) {
            const usuarioNuevo = new Usuario({ nombre, usuario, email, rol, contrasena });
            await usuarioNuevo.save();
            return res.status(201).json({ msj: "Usuario no encontrado, se creó uno nuevo", usuario: usuarioNuevo });
        }

        res.status(200).json({ msj: "Actualización exitosa" });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { usuario } = req.params;
        const usuarioEliminado = await Usuario.findOneAndDelete({ usuario });

        if (!usuarioEliminado) {
            return res.status(404).json({ "Mensaje": `No se encontró el usuario con nombre de usuario ${usuario}.` });
        }

        res.status(200).json({ "Mensaje": `Usuario ${usuario} eliminado correctamente.` });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const registro_usuario = async (recibido, respuesta) => {
    try {
        const { nombre,usuario, email,password, rol } = recibido.body;
        const cifrado = await bcrypt.hash(password, 10);
        const registro = new Usuario({"nombre": nombre, "usuario": usuario, "rol": rol,"password": cifrado });
        await registro.save();
        respuesta.status(201).json({ "msj": "usuario registrado", "registro": registro });
    } catch (error) {
        respuesta.status(500).json({ "msj": "error en registro" });
    }
};

const iniciar_sesion = async (recibido, respuesta) => {
    try {
        const { usuario, password } = recibido.body;
        const consultaUsuario = await Usuario.findOne({ "usuario": usuario });
        if (!consultaUsuario) {
            return respuesta.status(500).json({ "msj": `el usuario ${usuario} no registrado` });
        }
        let comparacion = await bcrypt.compare(password, consultaUsuario.password);
        if (!comparacion) return respuesta.status(500).json({ "msj": "credenciales de acceso no validas" });

        const token = jwt.sign({
            "id": consultaUsuario._id,
            "rol": consultaUsuario.rol
        },
            process.env.JWT_SECRET,
            { "expiresIn": "1hr" });

        respuesta.status(201).json({ "msj": "iniciando sesion exitoso!", "token": token });

    } catch (error) {
        respuesta.status(500).json({ "msj": error.msj });

    }
};

export {consultas,consulta_individuales,insercionUsuario,actualizarUsuario,eliminarUsuario,registro_usuario,iniciar_sesion};