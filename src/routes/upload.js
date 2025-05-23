import express from 'express';
import upload from '../config/archivosconfig.js';
import Imagen from '../models/Imagen.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ningún archivo' });
    }
    const imageUrl = req.file.filename; 
    const nuevaImagen = new Imagen({ imageUrl });
    await nuevaImagen.save();
    res.json({ message: 'Imagen subida correctamente', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la imagen', error: error.message });
  }
});

// Ruta para eliminar imagen
router.delete('/delete-image', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: 'No se proporcionó la imagen a eliminar' });
    }

    // Elimina el registro de la base de datos
    const deleted = await Imagen.findOneAndDelete({ imageUrl });
    if (!deleted) {
      return res.status(404).json({ message: 'Imagen no encontrada en la base de datos' });
    }

    // Elimina el archivo físico
    const imagePath = path.join(process.cwd(), 'src', 'imgs', imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        return res.status(500).json({ message: 'Error al eliminar el archivo', error: err.message });
      }
      res.json({ message: 'Imagen eliminada correctamente' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la imagen', error: error.message });
  }
});

export default router;