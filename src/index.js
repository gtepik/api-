import express from 'express';
import cors from 'cors';
import router from '../src/routes/web.js';
import Conexion from '../src/config/conexion.js';
import uploadRoutes from './routes/upload.js';

const app = express();
app.use(express.json());
app.use(cors());
Conexion();

app.use("/", router);
app.use("/api", uploadRoutes);
app.use('/src/imgs', express.static('src/imgs'));

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log("Programa iniciado");
    console.log(`🌐 URL: http://localhost:${PUERTO}`);
});