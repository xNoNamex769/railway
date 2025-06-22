import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (_req: Request, _file: Express.Multer.File, cb) {
cb(null, path.join(__dirname, "../../uploads"));

  },
  filename: function (_req: Request, file: Express.Multer.File, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name); // Nombre único
  },
});

// Filtro de tipo de archivo (solo imágenes)
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("❌ Solo se permiten archivos de imagen"));
  }
};

// Exportación del middleware ya configurado
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
});
