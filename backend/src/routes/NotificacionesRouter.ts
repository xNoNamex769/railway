import { Router } from 'express';
import { NotificacionesController } from '../controllers/NotificacionesController';
import { handleInputErrors } from '../middleware/validation';
import {validateIdNotificacion,validateNotificacionBody} from '../middleware/Notificaciones';

const router = Router();

// Obtener todas las notificaciones
router.get(
  '/',
  NotificacionesController.getNotificacionesAll
);

// Obtener una notificación por ID
router.get(
  '/:IdNotificacion',
  validateIdNotificacion,
  handleInputErrors,
  NotificacionesController.getIdNotificacion
);

// Crear una nueva notificación
router.post(
  '/',
  validateNotificacionBody,
  handleInputErrors,
  NotificacionesController.crearNotificacion
);

// Actualizar una notificación por ID
router.put(
  '/:IdNotificacion',
  validateIdNotificacion,
  validateNotificacionBody,
  handleInputErrors,
  NotificacionesController.actualizarIdNotificacion
);

// Eliminar una notificación por ID
router.delete(
  '/:IdNotificacion',
  validateIdNotificacion,
  handleInputErrors,
  NotificacionesController.eliminarIdNotificacion
);

export default router;
