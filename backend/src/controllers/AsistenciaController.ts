import type { Request, Response } from "express";
import { Asistencia } from "../models/Asistencia"; // Asegúrate de importar el modelo Asistencia

export class AsistenciaControllers {
    // Obtener todas las asistencias ordenadas por `AsiFecha`
    static getAsistenciaAll = async (req: Request, res: Response) => {
        try {
            console.log('Desde GET /api/Asistencia');
            
            const asistencia = await Asistencia.findAll({
                order: [
                    ['AsiFecha', 'ASC'], // Ordenar por la fecha de asistencia
                ],
            });

            res.json(asistencia);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    };

    // Obtener asistencia por ID
    // toca traer la asistencia por actividad o evento del usuario 
    static getIdAsistencia = async (req: Request, res: Response) => {
        try {
            const { AsiId } = req.params;
            const asistencia = await Asistencia.findByPk(AsiId);
            if (!asistencia) {
                const error = new Error('Asistencia no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }
            res.json(asistencia);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener la Asistencia' });
        }
    };

    // Crear nueva asistencia
    static crearAsistencia = async (req: Request, res: Response) => {
        try {
            const asistencia = new Asistencia(req.body);
            await asistencia.save();
            res.status(201).json('Asistencia creada exitosamente');
        } catch (error) {
            console.error('Error al crear asistencia:', error);
            res.status(500).json({ error: 'Hubo un error al crear la Asistencia' });
        }
    };

    // Actualizar asistencia por ID
    static actualizarIdAsistencia = async (req: Request, res: Response) => {
        try {
            const { AsiId } = req.params;
            const asistencia = await Asistencia.findByPk(AsiId);
            if (!asistencia) {
                const error = new Error('Asistencia no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }
            await asistencia.update(req.body);
            res.json('Asistencia actualizada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al actualizar la Asistencia' });
        }
    };

    // Eliminar asistencia por ID
    static eliminarIdAsistencia = async (req: Request, res: Response) => {
        try {
            const { AsiId } = req.params;
            const asistencia = await Asistencia.findByPk(AsiId);
            if (!asistencia) {
                const error = new Error('Asistencia no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }
            await asistencia.destroy();
            res.json('Asistencia eliminada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al eliminar la Asistencia' });
        }
    };
}
