
import mongoose from 'mongoose';
const VentasModelo = new mongoose.Schema({
    cliente: { type: String, required: true },
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    total: { type: Number, required: true },
    fecha: { type: Date, required: true }
});

export default mongoose.model('ventas', VentasModelo);