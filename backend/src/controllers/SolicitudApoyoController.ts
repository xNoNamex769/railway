import { Request, Response } from "express";
import { SolicitudApoyo } from "../models/SolicitudApoyo";
//quien hizo la peticin y el encargado con su rol

export class SolicitudApoyoController{
    static getAllSolicitudApoyo = async (req: Request, res:Response) => {
        try {
            const SolicitudesApoyos = await SolicitudApoyo.findAll();
            res.json(SolicitudesApoyos);
    } catch (error){
            //console.error(error);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }

    static getSolicitudApoyoId = async (req: Request, res: Response) => {
        try {
            const {IdSolicitud } = req.params;
            const solicitudDelApoyo = await SolicitudApoyo.findOne({
                where: { IdSolicitud}
            });
            if(!solicitudDelApoyo){
                const error = new Error('Solicitud de apoyo no encontrada');
                res.status(404).json({ error: error.message });
                return;
            }
            res.json(solicitudDelApoyo)
        }
        catch (error){
            //console.error(error);
            res.status(500).json({ error: 'Ocurrio un error'});
        }
}

    static CrearSolicitudApoyo = async ( req:Request, res:Response) =>{
        try{
            const solicituDelApoyo = new SolicitudApoyo(req.body);
            await solicituDelApoyo.save();
            res.status(201).json('Solicitud de apoyo creada existosamente');
        }catch ( error){
            //console.error('Error al crear solicitud de apoyo', error);
            res.status(500).json({ error: 'Hubo un error al crear la solicitud de apoyo'})
        }
    };

    static actualizarSolicitudAopoyo = async (req: Request, res: Response) =>{
        try {
            const { IdSolicitud} = req.params;
            const solicitudDelApoyo = await SolicitudApoyo.findByPk(IdSolicitud);

            if(!solicitudDelApoyo){
                res.status(404).json({error : 'Solicitud de apoyo no encontrada'})
                return;
            }
            await solicitudDelApoyo.update(req.body);
            res.json('Solicitud de apoyo actualizada correctamente');
        }
        catch (error){
            console.error('Error al actualizar solicitud de apoyo', error);
            res.status(500).json({ error: 'Hubo un error al actualizar la solicitud de apoyo' });
        }
    };

    static eliminarSolicitudApoyo = async ( req: Request, res: Response) => {
        try {
            const { IdSolicitud} = req.params;
            const solicitudDelApoyo = await SolicitudApoyo.findByPk(IdSolicitud);

            if(!solicitudDelApoyo){
                res.status(404).json(({ error: 'Solicitud de apoyo no encontrada' }));
                return;
            }
              await solicitudDelApoyo.destroy();
                res.json('Solicitud de apoyo eliminada correctamente');  
        } catch ( error){
            console.error('Error al eliminar la solicitud de apoyo', error);
            res.status(500).json({error: 'Hubo un error al eliminar la solicitud de apoyo' });
        }
    }


}