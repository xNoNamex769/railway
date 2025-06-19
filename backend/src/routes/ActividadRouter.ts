import { Router } from 'express';
import { body,param } from 'express-validator';
import {ActividadControllers} from '../controllers/ActividadController';
import {handleInputErrors} from '../middleware/validation'
import {validateActividadBody,validateIdActividad, validateIdActividadYaExiste,} from '../middleware/Actividad';

const router = Router();

// Obtener todas las actividades
router.get('/', ActividadControllers.getActividadAll);

// Obtener una actividad por ID
router.get('/:IdActividad',
  validateIdActividad,
  handleInputErrors,
  ActividadControllers.getIdActividad
);

// Crear una actividad (nombre único)
router.post(
'/',
  validateIdActividadYaExiste,
  validateActividadBody,
  handleInputErrors,
  ActividadControllers.crearActividad
);

// Actualizar una actividad por ID (no se valida si el nombre ya existe)
router.put(
  '/:IdActividad',
  validateIdActividad,
  validateActividadBody,
  handleInputErrors,
  ActividadControllers.actualizarIdActividad
);
router.get(
  '/evento/:IdEvento',
  param('IdEvento').isInt().withMessage('IdEvento debe ser un número entero'),
  handleInputErrors,
  ActividadControllers.getActividadesPorEvento
);
// Eliminar una actividad por ID
router.delete(
  '/:IdActividad',
  validateIdActividad,
  handleInputErrors,
  ActividadControllers.eliminarIdActividad
);


export default router;
