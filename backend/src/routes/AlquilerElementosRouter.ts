import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import {
  validateAlquilerBody,
  validateIdAlquiler,
  validateIdAlquilerYaExiste,
   validateIdUsuario
} from '../middleware/AlquilerElementos';
import { verificarToken } from '../middleware/VerificarToken'; 
import { AlquilerElementosControllers } from '../controllers/AlquilerElementoControllers';
import multer from 'multer';
import { CatalogoController } from '../controllers/CatalogoAlquiler';

const router = Router();

// Obtener todos los alquileres
router.get('/', AlquilerElementosControllers.getAlquilerElementosAll);

// Obtener un alquiler por ID

// Crear un alquiler
router.post(
  '/',
  validateIdAlquilerYaExiste,
  validateAlquilerBody,
  handleInputErrors,
  AlquilerElementosControllers.crearAlquiler
);


// Actualizar un alquiler por ID
router.put(
  '/:IdAlquiler',
  validateIdAlquiler,
  validateAlquilerBody,
  handleInputErrors,
  AlquilerElementosControllers.actualizarIdAlquiler
);

// Eliminar un alquiler por ID
router.delete(
  '/:IdAlquiler',
  validateIdAlquiler,
  handleInputErrors,
  AlquilerElementosControllers.eliminarIdAlquiler
);
// nueva ruta zozorrass
router.get(
  '/usuario/:IdUsuario',
  validateIdUsuario,
  handleInputErrors,
  AlquilerElementosControllers.getAlquileresPorUsuario
);
router.put("/alquiler/:IdAlquiler/devolver", AlquilerElementosControllers.devolverElemento);
router.post(
  '/desde-qr',
  verificarToken, // <-- extrae el IdUsuario desde el token
  AlquilerElementosControllers.registrarDesdeQR
);


//subir elementos 



const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });
router.post('/catalogo', upload.single('imagen'), CatalogoController.subirElemento);
router.get('/catalogo', CatalogoController.getCatalogo);
router.put(
  '/catalogo/:IdAlquiler/imagen',
  upload.single('imagen'),
  CatalogoController.actualizarImagen
);
router.delete('/catalogo/:IdAlquiler', CatalogoController.eliminarElemento);

export default router;
