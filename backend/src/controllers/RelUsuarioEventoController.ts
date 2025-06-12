import { Request, Response } from "express";
import { RelUsuarioEvento } from "../models/RelUsuarioEvento"; 
//relacion del usuario con el evento creado 
export class RelUsuarioEventoControllers {

    static getRelUsuarioEventoAll = async (req: Request, res: Response) => {
        try {
            console.log('Desde GET /api/relusuarioevento');

            
            const relUsuarioEvento = await RelUsuarioEvento.findAll({
                order: [
                    ['Idusuario', 'ASC'], // Ordenar por el campo id
                ],
            });

            res.json(relUsuarioEvento); 
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Hubo un error' }); 
        }
    };

    static getIdRelUsuarioEvento = async (req: Request, res: Response) => {
        try {
            const { IdUsuario } = req.params; 
            const relUsuarioEvento = await RelUsuarioEvento.findByPk(IdUsuario);

            if (!relUsuarioEvento) {
                const error = new Error('Relación no encontrada');
                console.log(error)
                res.status(404).json({ error: error.message });
                return;
            }

            res.json(relUsuarioEvento); 
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };

    static crearRelUsuarioEvento = async (req: Request, res: Response) => {
        try {
            const relUsuarioEvento = new RelUsuarioEvento(req.body);
            await relUsuarioEvento.save();
            res.status(201).json('Relación creada exitosamente');
        } catch (error) {
            console.error('Error al crear relación:', error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    };

    static actualizarIdRelUsuarioEvento = async (req: Request, res: Response) => {
        try {
            const { IdUsuario } = req.params; 
            const relUsuarioEvento = await RelUsuarioEvento.findByPk(IdUsuario);

            if (!relUsuarioEvento) {
                const error = new Error('Relación no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }

            await relUsuarioEvento.update(req.body); 
            res.json('Relación actualizada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };

    static eliminarIdRelUsuarioEvento = async (req: Request, res: Response) => {
        try {
            const { Idusuario } = req.params;
            const relUsuarioEvento = await RelUsuarioEvento.findByPk(Idusuario);

            if (!relUsuarioEvento) {
                const error = new Error('Relación no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }

            await relUsuarioEvento.destroy(); 
            res.json('Relación eliminada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
}
