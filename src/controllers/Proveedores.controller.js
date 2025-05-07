import Proveedor from "../models/Proveedores.js";

const consulta = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const consulta_individual = async (req, res) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});
        const { nombre } = req.params;
        const proveedor = await Proveedor.findOne({ nombre });
        if (!proveedor) {
            return res.status(404).json({ "msj": `No se encontró ningún proveedor con el nombre ${nombre}.` });
        }
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const insercionProveedor = async (recibido, respuesta) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});
        const { nombre, contacto, telefono, ...otrosCampos } = req.body;

        if (Object.keys(otrosCampos).length > 0) {
            return res.status(400).json({ "msj": "Datos inválidos: se recibieron campos no permitidos." });
        }
        if (!nombre || !contacto || !telefono) {
            return res.status(400).json({ "msj": "Datos inválidos: todos los campos (nombre, contacto, telefono) son obligatorios." });
        }
        const proveedorExistente = await Proveedor.findOne({ nombre });
        if (proveedorExistente) {
            return res.status(400).json({ "msj": "Datos inválidos: el nombre del proveedor ya está en uso." });
        }
        const proveedorNuevo = new Proveedor({ nombre, contacto, telefono });
        await proveedorNuevo.save();
        res.status(201).json(proveedorNuevo);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const actualizarProveedor = async (recibido, respuesta) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});
        const { nombre, contacto, telefono } = req.body;
        const proveedorActual = req.params.nombre;
        const resultado = await Proveedor.updateOne(
            { nombre: proveedorActual },
            { $set: { nombre, contacto, telefono } }
        );
        if (resultado.modifiedCount === 0) {
            const proveedorNuevo = new Proveedor({ nombre, contacto, telefono });
            await proveedorNuevo.save();
            return res.status(201).json({ "msj": "Proveedor no encontrado, pero se creó uno nuevo.", "proveedor": proveedorNuevo });
        }
        res.status(200).json({ "msj": "Actualización exitosa!" });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const eliminarProveedor = async (recibido, respuesta) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});
        const { nombre } = req.params;
        const proveedorEliminado = await Proveedor.findOneAndDelete({ nombre });

        if (!proveedorEliminado) {
            return res.status(404).json({ "Mensaje": `No se encontró el proveedor con nombre ${nombre}.` });
        }

        res.status(200).json({ "Mensaje": `Proveedor con nombre ${nombre} eliminado correctamente.` });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

export { consulta, consulta_individual, insercionProveedor, actualizarProveedor, eliminarProveedor };