import type { Request, Response } from "express";
import { PlanificacionEvento } from "../models/PlanificacionEvento"; // Importa el modelo adecuado
import { error } from "console";
// esto esta bien , falta es traer al usuario quiem hizo esta peticion 
export class PlanificacionEventoControllers {


    static getPlanificarEventoAll = async (req: Request, res: Response) => {
        try {
            console.log('Desde GET /api/planificarEvento');

          
            const eventos = await PlanificacionEvento.findAll({
                order: [
                    ['FechaEvento', 'ASC'], 
                ],
            });

            res.json(eventos); 
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Hubo un error' }); 
        }
    };

    
    static getIdPlanificarEvento = async (req: Request, res: Response) => {
        try {
            const { IdPlanificarE } = req.params;
            const evento = await PlanificacionEvento.findByPk(IdPlanificarE);
            if (!evento) {
                const error = new Error('Evento no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }
            res.json(evento); 
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };

    
    static crearPlanificarEvento = async (req: Request, res: Response) => {
        try {
            const evento = new PlanificacionEvento(req.body);
            await evento.save();
            res.status(201).json('Evento planificado creado exitosamente');
        } catch (error) {
            console.error('Error al crear evento planificado:', error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    };

    
    static actualizarIdPlanificarEvento = async (req: Request, res: Response) => {
        try {
            const { IdPlanificarE } = req.params;
            const evento = await PlanificacionEvento.findByPk(IdPlanificarE);
            if (!evento) {
                const error = new Error('Evento no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }
            await evento.update(req.body); 
            res.json('Evento planificado actualizado correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };

    
    static eliminarIdPlanificarEvento = async (req: Request, res: Response) => {
        try {
            const { IdPlanificarE } = req.params;
            const evento = await PlanificacionEvento.findByPk(IdPlanificarE);
            if (!evento) {
                const error = new Error('Evento no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }
            await evento.destroy(); 
            res.json('Evento planificado eliminado correctamente');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
}
