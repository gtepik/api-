
import mongoose from 'mongoose';
const ProveedorModelo = new mongoose.Schema({
    nombre: { type: String, required: true },
    contacto: { type: String, required: true },
    telefono: { type: String, required: true }
});

export default mongoose.model('proveedor',ProveedorModelo);