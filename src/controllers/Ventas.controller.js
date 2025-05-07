import Venta from "../models/Ventas.js";

const consulta = async (req, res) => {
    try {
        const ventas = await Venta.find();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

const consultaVentaPorId = async (req, res) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});
        const venta = await Venta.findById(req.params.id);
        if (!venta) return res.status(404).json({ msj: "Venta no encontrada" });
        res.json({
            id: venta._id, 
            cliente: venta.cliente,
            producto: venta.producto,
            cantidad: venta.cantidad,
            total: venta.total,
            fecha: venta.fecha,
        });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

const insercionVenta = async (recibido, respuesta) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});
        const { cliente, producto, cantidad, total, fecha, ...otrosCampos } = req.body;

        if (Object.keys(otrosCampos).length > 0) {
            return res.status(400).json({ msj: "Datos inválidos: se recibieron campos no permitidos." });
        }

        if (!cliente || !producto || cantidad === undefined || total === undefined || !fecha) {
            return res.status(400).json({ msj: "Todos los campos (cliente, producto, cantidad, total, fecha) son obligatorios." });
        }

        const nuevaVenta = new Venta({ cliente, producto, cantidad, total, fecha });
        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

const actualizarVenta = async (recibido, respuesta) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});    
        const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!venta) return res.status(404).json({ msj: "Venta no encontrada para actualizar" });
        res.json(venta);
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

const eliminarVenta = async (recibido, respuesta) => {
    try {
        if(recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisosos para ejecutar esta accion"});
        const venta = await Venta.findByIdAndDelete(req.params.id);
        if (!venta) return res.status(404).json({ msj: "Venta no encontrada para eliminar" });
        res.json({ msj: "Venta eliminada correctamente", venta });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
};

export {
    consulta,
    consultaVentaPorId,
    insercionVenta,
    actualizarVenta,
    eliminarVenta,
};
