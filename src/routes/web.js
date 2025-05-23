import express from 'express';
import authMiddleware from '../config/authMiddleware.js';
import { consultas, consulta_individuales, insercionUsuario, actualizarUsuario, eliminarUsuario, registro_usuario, iniciar_sesion } from '../controllers/Usuario.controller.js';
import { consulta, consulta_individual, insercionCliente, actualizarCliente, eliminarCliente } from '../controllers/Clientes.controller.js';
import { consultaVentas, consultaVenta, insercionVenta, actualizarVenta, eliminarVenta } from '../controllers/Ventas.controller.js';
import upload from '../config/archivosconfig.js';
import Imagen from '../models/Imagen.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/login', iniciar_sesion);
router.post('/registro', registro_usuario);

// Rutas para clientes
router.get('/clientes', consulta);
router.get('/clientes/:id', consulta_individual);
router.post('/agregarCliente/', authMiddleware, insercionCliente);
router.put('/editarCliente/:id', authMiddleware, actualizarCliente);
router.delete('/eliminarCliente/:id', authMiddleware, eliminarCliente);

// Rutas para ventas
router.get('/ventas', consultaVentas);
router.get('/ventas/:id', consultaVenta);
router.post('/agregarVentas/', authMiddleware, insercionVenta);
router.put('/editarVentas/:id', authMiddleware, actualizarVenta);
router.delete('/eliminarVentas/:id', authMiddleware, eliminarVenta);

// Rutas para usuarios
router.get('/usuarios', consultas);
router.get('/usuarios/:id', consulta_individuales);
router.post('/agregarUsuarios/', authMiddleware, insercionUsuario);
router.put('/editarUsuarios/:id', authMiddleware, actualizarUsuario);
router.delete('/eliminarUsuarios/:id', authMiddleware, eliminarUsuario);

// Ruta para subir imágenes (POST)
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ningún archivo' });
    }
    // Guarda solo el nombre del archivo
    const imageUrl = req.file.filename;
    const nuevaImagen = new Imagen({ imageUrl });
    await nuevaImagen.save();
    res.json({ message: 'Imagen subida correctamente', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la imagen', error: error.message });
  }
});

// Ruta para obtener todas las imágenes (GET)
router.get('/imagenes', async (req, res) => {
  try {
    const imagenes = await Imagen.find().sort({ createdAt: -1 });
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las imágenes', error: error.message });
  }
});

// Endpoint para obtener nombres de imágenes desde la carpeta src/imgs
router.get('/api/images', (req, res) => {
  const imagesDir = path.join(process.cwd(), 'src', 'imgs');
  fs.readdir(imagesDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'No se pueden leer las imágenes' });
    res.json(files.map(filename => ({ imageUrl: filename })));
  });
});

export default router;