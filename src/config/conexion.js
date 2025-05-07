import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Conexion = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 5 
        });
        console.log('✅ Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos de MongoDB', error.message);
        process.exit(1);
    }
};
export default Conexion;