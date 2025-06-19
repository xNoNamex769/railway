import type { Request, Response } from "express";
import { AlquilerElementos } from "../models/AlquilerElementos";
import { Usuario } from "../models/Usuario";

export class AlquilerElementosControllers {
  
  static getAlquilerElementosAll = async (req: Request, res: Response) => {
    try {
      const alquiler = await AlquilerElementos.findAll({
        order: [['createdAt', 'ASC']],
        include: [Usuario],  // Trae datos del usuario que hizo el alquiler
      });
      res.json(alquiler);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error' });
    }
  };

  static getIdAlquiler = async (req: Request, res: Response) => {
    try {
      const { IdAlquiler } = req.params;
      const alquiler = await AlquilerElementos.findByPk(IdAlquiler, {
        include: [Usuario],  // Trae datos del usuario
      });
      if (!alquiler) {
         res.status(404).json({ error: 'Alquiler no encontrado' });
         return;
      }
      res.json(alquiler);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener el alquiler' });
    }
  };

  static crearAlquiler = async (req: Request, res: Response) => {
    try {
      const alquiler = new AlquilerElementos(req.body);
      await alquiler.save();
      res.status(201).json('Alquiler creado exitosamente');
    } catch (error) {
      console.error('Error al crear alquiler:', error);
      res.status(500).json({ error: 'Hubo un error al crear el Alquiler' });
    }
  };

  static actualizarIdAlquiler = async (req: Request, res: Response) => {
    try {
      const { IdAlquiler } = req.params;
      const alquiler = await AlquilerElementos.findByPk(IdAlquiler);
      if (!alquiler) {
        res.status(404).json({ error: 'Alquiler no encontrado' });
        return;
      }
      await alquiler.update(req.body);
      res.json('Alquiler actualizado correctamente');
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al Actualizar el Alquiler' });
    }
  };

  static eliminarIdAlquiler = async (req: Request, res: Response) => {
    try {
      const { IdAlquiler } = req.params;
      const alquiler = await AlquilerElementos.findByPk(IdAlquiler);
      if (!alquiler) {
       res.status(404).json({ error: 'Alquiler no encontrado' });
       return;
      }
      await alquiler.destroy();
      res.json('Alquiler eliminado correctamente');
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al Eliminar el Alquiler' });
    }
  };

  // Nuevo método: obtener alquileres filtrados por IdUsuario prestaran atencion zungas
  static getAlquileresPorUsuario = async (req: Request, res: Response) => {
    try {
      const { IdUsuario } = req.params;
      const alquileres = await AlquilerElementos.findAll({
        where: { IdUsuario },
        include: [Usuario],  // Trae datos del usuario
      });
      res.json(alquileres);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener alquileres por usuario' });
    }
  };

static registrarDesdeQR = async (req: Request, res: Response) => {
  try {
    const IdUsuario = req.usuario?.IdUsuario;
    const { IdElemento } = req.body;

    if (!IdUsuario || !IdElemento) {
   res.status(400).json({ error: "Faltan datos del usuario o del elemento." });
   return;
    }

    await AlquilerElementos.create({
      IdUsuario,
      Elemento: `Elemento ID ${IdElemento}`, // Aquí puedes mejorar si tienes tabla elementos
      FechaEntrega: new Date(),
      FechaDevolucion: null,
      Observaciones: "Registrado automáticamente desde QR",
    });

    res.json({ mensaje: "Alquiler registrado exitosamente desde QR." });
  } catch (error) {
    console.error("Error al registrar desde QR:", error);
    res.status(500).json({ error: "Error interno al registrar el alquiler desde QR." });
  }
};
}