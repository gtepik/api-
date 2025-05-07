import express from 'express';
import authMiddleware from '../config/authMiddleware.js';
import { iniciar_sesion, registro_usuario } from '../controllers/Usuario.controller.js';
import { consulta, consulta_individual, insercionCliente, actualizarCliente, eliminarCliente } from '../controllers/Clientes.controller.js';

const router = express.Router();

router.post('/login', iniciar_sesion);
router.post('/registro', registro_usuario);

// Rutas para clientes
router.get('/clientes', consulta);
router.get('/clientes/:id', consulta_individual);
router.post('/agregarCliente/',authMiddleware, insercionCliente);
router.put('/editarCliente/:id', authMiddleware,actualizarCliente);
router.delete('/eliminarCliente/:id',authMiddleware, eliminarCliente);

export default router;