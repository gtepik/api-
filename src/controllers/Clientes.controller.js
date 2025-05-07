import Clientes from "../models/Clientes.js";

const consulta = async (req, res) => {
    try {
        const clientes = await Clientes.find();
        const clientesFormateados = clientes.map(cliente => {
            const clienteObj = cliente.toObject();
            clienteObj.id = clienteObj._id;
            delete clienteObj._id;
            delete clienteObj.__v;
            return clienteObj;
        });
        res.json(clientesFormateados);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const consulta_individual = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Clientes.findById(id);
        if (!cliente) {
            return res.status(404).json({ "msj": `No se encontró ningún cliente con el ID ${id}.` });
        }
        const clienteObj = cliente.toObject();
        clienteObj.id = clienteObj._id;
        delete clienteObj._id;
        delete clienteObj.__v;
        res.json(clienteObj);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const insercionCliente = async (req, res) => {
    try {
        if (req.user) return res.status(500).json({ "msj": "No tienes permisos para ejecutar esta acción" });
        
        const { nombre, telefono, email, compras } = req.body;
        if (!nombre || !telefono || !email) {
            return res.status(400).json({ "msj": "Todos los campos (nombre, telefono, email) son obligatorios." });
        }

        const clienteNuevo = new Clientes({ nombre, telefono, email, compras: compras || 0 });
        await clienteNuevo.save();

        const clienteObj = clienteNuevo.toObject();
        clienteObj.id = clienteObj._id;
        delete clienteObj._id;
        delete clienteObj.__v;

        res.status(201).json(clienteObj);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const actualizarCliente = async (req, res) => {
    try {
        if (req.user) return res.status(500).json({ "msj": "No tienes permisos para ejecutar esta acción" });

        const { id } = req.params;
        const { nombre, telefono, email, compras } = req.body;

        const resultado = await Clientes.findByIdAndUpdate(
            id,
            { nombre, telefono, email, compras },
            { new: true }
        );

        if (!resultado) {
            return res.status(404).json({ msj: "Cliente no encontrado." });
        }

        const clienteObj = resultado.toObject();
        clienteObj.id = clienteObj._id;
        delete clienteObj._id;
        delete clienteObj.__v;

        res.status(200).json(clienteObj);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const eliminarCliente = async (req, res) => {
    try {
        if (req.user) return res.status(500).json({ "msj": "No tienes permisos para ejecutar esta acción" });

        const { id } = req.params;
        const clienteEliminado = await Clientes.findByIdAndDelete(id);

        if (!clienteEliminado) {
            return res.status(404).json({ "Mensaje": `No tienes permisos para ejecutar esta acción con el id ${id}.` }); //No se encontró el cliente con ID
        }

        res.status(200).json({ "Mensaje": `Cliente con ID ${id} eliminado correctamente.` });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

export { consulta, consulta_individual, insercionCliente, actualizarCliente, eliminarCliente };
