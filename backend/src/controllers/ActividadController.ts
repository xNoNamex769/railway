import type { Request , Response } from "express";
import { Actividad } from "../models/Actividad";


import { Evento } from "../models/Evento";  // Importar el modelo locas  el Evento para usar en include

export class ActividadControllers {
  
  static getActividadAll = async (req: Request, res: Response) => {
    try {
      console.log('Desde GET /api/actividad');

      // Obtener todas las actividades ordenadas por `createdAt` e incluir el evento relacionado
      const actividades = await Actividad.findAll({
        order: [['createdAt', 'ASC']],
        include: [Evento],
      });

      res.json(actividades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error' });
    }
  };

  static getIdActividad = async (req: Request, res: Response) => {
    try {
      const { IdActividad } = req.params;
      // Buscar actividad por PK(primary key sisas?) e incluir evento relacionado
      const actividad = await Actividad.findByPk(IdActividad, {
        include: [Evento],
      });

      if (!actividad) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        return;
      }

      res.json(actividad);
    } catch (error) {
      res.status(500).json({ error: 'hubo un error' });
    }
  };

  static crearActividad = async (req: Request, res: Response) => {
    try {
      const actividad = new Actividad(req.body);
      await actividad.save()
      res.status(201).json({message: 'Actividad creada exitosamente',});
    } catch (error) {
      console.error('Error al crear actividad:', error);
      res.status(500).json({ error: 'hubo error' });
    }
  };

  static actualizarIdActividad = async (req: Request, res: Response) => {
    try {
      const { IdActividad } = req.params;
      const actividad = await Actividad.findByPk(IdActividad);
      if (!actividad) {
     res.status(404).json({ error: 'Actividad no encontrada' });
     return;
      }
      await actividad.update(req.body);
      res.json(actividad);
    } catch (error) {
      res.status(500).json({ error: 'hubo un error' });
    }
  };
  // aqui esta el metodo para  traer acitividades por evento metodo get zungas//
  // falta traer por id de la actividad que pertenece a tal evento 
  static getActividadesPorEvento = async (req: Request, res: Response) => {
  try {
    const { IdEvento } = req.params;
    const actividades = await Actividad.findAll({ 
      where: { IdEvento }
     
    });
    res.json(actividades);
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ error: 'Error al obtener actividades por evento' });
  }
};



  static eliminarIdActividad = async (req: Request, res: Response) => {
    try {
      const { IdActividad } = req.params;
      const actividad = await Actividad.findByPk(IdActividad);
      if (!actividad) {
       res.status(404).json({ error: 'Actividad no encontrada' });
       return;
      }
      await actividad.destroy();
      res.json({ message: 'Actividad eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'hubo un error' });
    }
  };

}