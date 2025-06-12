import type { Request, Response } from "express";
import { Evento } from "../models/Evento";
// quien creo el evento: un usuario , y a los eventos asistidos de ese usuario
export class EventoControllers {
    static getEventoAll = async (req: Request, res: Response) => {
        try {
            console.log('Desde GET/api/evento');

            const eventos = await Evento.findAll({ 
                order: [
                    ['createdAt', 'ASC'],
                ], 
            });
            res.json(eventos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener los eventos' });
        }
    };

    static getIdEvento = async (req: Request, res: Response) => {
        try {
            const { IdEvento } = req.params;
            const evento = await Evento.findByPk(IdEvento);
            if (!evento) {
                const error =new Error('Evento no encontrado')
                res.status(404).json({ error:error.message });
                return;
            }
            res.json(evento);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al buscar el evento' });
        }
    };

    static crearEvento = async (req: Request, res: Response) => {
        try {
            const evento = new Evento(req.body)
            await evento.save()
            res.status(201).json('Evento creado Exitosamente');
        } catch (error) {
            console.error('Error al crear evento:', error);
            res.status(500).json({ error: 'Hubo un error al crear el evento' });
        }
    };

    static actualizarIdEvento = async (req: Request, res: Response) => {
        try {
            const { IdEvento } = req.params;
            const evento = await Evento.findByPk(IdEvento);
            if (!evento) {
                const error =new Error('Evento no encontrado')
                res.status(404).json({ error:error.message });
                return;
            }
            await evento.update(req.body);
            res.json({ mensaje: 'Evento actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al actualizar el evento' });
        }
    };

    static eliminarIdEvento = async (req: Request, res: Response) => {
        try {
            const { IdEvento } = req.params;
            const evento = await Evento.findByPk(IdEvento);
            if (!evento) {
                const error =new Error('Evento no encontrado')
                res.status(404).json({ error: 'Evento no encontrado' });
                return;
            }
            await evento.destroy();
            res.json({ mensaje: 'Evento eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al eliminar el evento' });
        }
    };
}
