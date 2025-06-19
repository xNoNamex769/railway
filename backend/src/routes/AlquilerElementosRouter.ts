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

const router = Router();

// Obtener todos los alquileres
router.get('/', AlquilerElementosControllers.getAlquilerElementosAll);

// Obtener un alquiler por ID
router.get(
  '/:IdAlquiler',
  validateIdAlquiler,
  handleInputErrors,
  AlquilerElementosControllers.getIdAlquiler
);

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
router.post(
  '/desde-qr',
  verificarToken, // <-- extrae el IdUsuario desde el token
  AlquilerElementosControllers.registrarDesdeQR
);
export default router;
