import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import {validateAsistenciaBody,validateIdAsistencia,validateIdAsistenciaYaExiste,} from '../middleware/Asistencia'; 
import { AsistenciaControllers } from '../controllers/AsistenciaController';

const router = Router();

// Obtener todas las asistencias
router.get('/', AsistenciaControllers.getAsistenciaAll);

// Obtener una asistencia por ID
router.get(
  '/:AsiId',
  validateIdAsistencia,
  handleInputErrors,
  AsistenciaControllers.getIdAsistencia
);

// Crear una asistencia
router.post(
  '/',
  validateIdAsistenciaYaExiste,
  validateAsistenciaBody,
  handleInputErrors,
  AsistenciaControllers.crearAsistencia
);

// Actualizar una asistencia por ID
router.put(
  '/:AsiId',
  validateIdAsistencia,
  validateAsistenciaBody,
  handleInputErrors,
  AsistenciaControllers.actualizarIdAsistencia
);

// Eliminar una asistencia por ID
router.delete(
  '/:AsiId',
  validateIdAsistencia,
  handleInputErrors,
  AsistenciaControllers.eliminarIdAsistencia
);

export default router;
