import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Carpeta donde se guardarán las imágenes
const uploadDir = path.join(process.cwd(), 'src', 'imgs');

// Crear la carpeta si no existe
if (!fs.existsSync(uploadDir)) {                        
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Extensiones permitidas
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes jpg, jpeg, png, gif, webp'), false);
        }
    }
});

export default upload;