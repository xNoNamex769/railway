import { Request, Response } from "express";
import { Notificaciones } from "../models/Notificaciones"
// notificaciones a cada usuario , sobre , actividades , ludicas , eventos , o solicitues de apoyo
export class NotificacionesController {

    static getNotificacionesAll = async (req: Request, res: Response) => {
        try {
            const notificaciones = await Notificaciones.findAll({
                order: [['FechaDeEnvio', 'ASC']],
            });
            res.json(notificaciones);
        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
            res.status(500).json({ error: 'Hubo un error al obtener las notificaciones' });
        }
    };

    static getIdNotificacion= async (req: Request, res: Response) => {
        try {
            const { IdNotificacion } = req.params;
            const notificacion = await Notificaciones.findByPk(IdNotificacion);

            if (!notificacion) {
             res.status(404).json({ error: 'Notificación no encontrada' });
             return;
            }

            res.json(notificacion);
        } catch (error) {
            console.error('Error al obtener la notificación:', error);
            res.status(500).json({ error: 'Hubo un error al buscar la notificación' });
        }
    };

    static crearNotificacion = async (req: Request, res: Response) => {
        try {
            const notificacion = new Notificaciones(req.body);
            await notificacion.save();
            res.status(201).json('Notificación creada exitosamente');
        } catch (error) {
            console.error('Error al crear la notificación:', error);
            res.status(500).json({ error: 'Hubo un error al crear la notificación' });
        }
    };

    static actualizarIdNotificacion = async (req: Request, res: Response) => {
        try {
            const { IdNotificacion } = req.params;
            const notificacion = await Notificaciones.findByPk(IdNotificacion);

            if (!notificacion) {
                 res.status(404).json({ error: 'Notificación no encontrada' });
                 return;
            }

            await notificacion.update(req.body);
            res.json('Notificación actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la notificación:', error);
            res.status(500).json({ error: 'Hubo un error al actualizar la notificación' });
        }
    };

    static eliminarIdNotificacion = async (req: Request, res: Response) => {
        try {
            const { IdNotificacion } = req.params;
            const notificacion = await Notificaciones.findByPk(IdNotificacion);

            if (!notificacion) {
                res.status(404).json({ error: 'Notificación no encontrada' });
                return;
            }

            await notificacion.destroy();
            res.json('Notificación eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la notificación:', error);
            res.status(500).json({ error: 'Hubo un error al eliminar la notificación' });
        }
    };
}
