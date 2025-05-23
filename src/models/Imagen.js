import mongoose from 'mongoose';

const imagenSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Imagen', imagenSchema);