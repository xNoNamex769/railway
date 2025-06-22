import type { Request, Response } from "express";
import { Actividad } from "../models/Actividad";
import { Evento } from "../models/Evento";

export class ActividadControllers {
  static getActividadAll = async (req: Request, res: Response) => {
    try {
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
    console.log("💡 Middleware alcanzado");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const body = JSON.parse(JSON.stringify(req.body));


    const {
      NombreActi,
      Descripcion,
      FechaInicio,
      FechaFin,
      HoraInicio,
      
      HoraFin,
      TipoLudica,
      IdEvento,
      Ubicacion
    } = body;

    const image = req.file?.filename;

    // Validación mínima
    if (!NombreActi || !FechaInicio || !HoraInicio || !HoraFin || !TipoLudica || !IdEvento || !Ubicacion) {
      res.status(400).json({ error: "⚠️ Faltan campos requeridos" });
      return;
    }

    const nuevaActividad = await Actividad.create({
      NombreActi,
      Descripcion: Descripcion || null,
      FechaInicio: new Date(FechaInicio),
      FechaFin: new Date(FechaFin),
      HoraInicio,
      HoraFin,
      TipoLudica,
    
      IdEvento: parseInt(IdEvento), // ¡clave!
      Ubicacion,
      Imagen: image
    });

    res.status(201).json({
      message: "✅ Actividad creada exitosamente",
      actividad: nuevaActividad,
    });
    return;

  } catch (error) {
    console.error("❌ Error al crear actividad:", error);
res.status(500).json({ error: "Hubo un error en el servidor" });
return
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

