
import mongoose from 'mongoose';
const clientesModelo = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    compras: { type: Number, required: true }
});

export default mongoose.model('clientes', clientesModelo);