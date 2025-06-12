import { Request, Response } from "express";
import { Constancia } from "../models/Constancia"; // Asegúrate de importar el modelo Constancia

export class ConstanciaControllers {
    // Obtener todas las constancias ordenadas por `ConstanciaFecha` constancias del usuario 
    static getConstanciaAll = async (req: Request, res: Response) => {
        try {
            console.log('Desde GET /api/Constancia');
            
            const constancias = await Constancia.findAll({
                order: [
                    ['ConstanciaFecha', 'ASC'], // Ordenar por la fecha de la constancia
                ],
            });

            res.json(constancias); // Solo enviamos la respuesta sin usar `return`
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener las constancias' });
        }
    };

    // Obtener constancia por ID
    static getIdConstancia = async (req: Request, res: Response) => {
        try {
            const { ConstanciaId } = req.params; // Desestructuramos el ConstanciaId de los parámetros
            const constancia = await Constancia.findByPk(ConstanciaId);
            if (!constancia) {
                res.status(404).json({ error: 'Constancia no encontrada' });
                return; // Terminamos la ejecución después de enviar la respuesta
            }
            res.json(constancia); // Solo enviamos la respuesta sin usar `return`
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener la constancia' });
        }
    };

    // Crear nueva constancia
    static crearConstancia = async (req: Request, res: Response) => {
        try {
            const { ConstanciaHorasCert, ConstanciaEstado, ConstanciaFecha, IdUsuario } = req.body;

            // Validación básica
            if (!ConstanciaHorasCert || !ConstanciaEstado || !ConstanciaFecha || !IdUsuario) {
                res.status(400).json({ error: 'Faltan datos necesarios para crear la constancia' });
                return; // Terminamos la ejecución después de enviar la respuesta
            }

            // Crear la constancia
            const constancia = new Constancia({
                ConstanciaHorasCert,
                ConstanciaEstado,
                ConstanciaFecha,
                IdUsuario,
            });
            await constancia.save(); // Guardar en la base de datos
            res.status(201).json('Constancia creada exitosamente'); // Enviar respuesta
        } catch (error) {
            console.error('Error al crear constancia:', error);
            res.status(500).json({ error: 'Hubo un error al crear la constancia' });
        }
    };

    // Actualizar constancia por ID
    static actualizarIdConstancia = async (req: Request, res: Response) => {
        try {
            const { ConstanciaId } = req.params; // Desestructuramos el ConstanciaId de los parámetros
            const constancia = await Constancia.findByPk(ConstanciaId);
            if (!constancia) {
                res.status(404).json({ error: 'Constancia no encontrada' });
                return; // Terminamos la ejecución después de enviar la respuesta
            }

            // Actualizar los datos de la constancia
            await constancia.update(req.body);
            res.json('Constancia actualizada correctamente'); // Enviar respuesta
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al actualizar la constancia' });
        }
    };

    // Eliminar constancia por ID
    static eliminarIdConstancia = async (req: Request, res: Response) => {
        try {
            const { ConstanciaId } = req.params; // Desestructuramos el ConstanciaId de los parámetros
            const constancia = await Constancia.findByPk(ConstanciaId);
            if (!constancia) {
                res.status(404).json({ error: 'Constancia no encontrada' });
                return; // Terminamos la ejecución después de enviar la respuesta
            }

            // Eliminar la constancia
            await constancia.destroy();
            res.json('Constancia eliminada correctamente'); // Enviar respuesta
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al eliminar la constancia' });
        }
    };
}
