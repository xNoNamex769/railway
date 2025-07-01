import type { Request, Response } from 'express';
import { AlquilerElementos } from '../models/AlquilerElementos';
import { Usuario } from '../models/Usuario';
import { enviarNotificacionGeneral } from '../services/notificaciongeneral';
export class CatalogoController {
 static subirElemento = async (req: Request, res: Response) => {
    try {
      const { NombreElemento } = req.body;
      const Imagen = req.file?.filename;

      if (!NombreElemento || !Imagen) {
        res.status(400).json({ error: 'Nombre e imagen son requeridos' });
        return;
      }

     const nuevoElemento = await AlquilerElementos.create({
  NombreElemento,
  Imagen,
  Observaciones: 'catalogo',
  FechaSolicitud: new Date(),
  FechaDevolucion: new Date(),
  RegistradoPor: 'sistema',
  IdUsuario: null,
});


      // 👉 Buscar aprendices (IdRol = 2, por ejemplo)
      const aprendices = await Usuario.findAll({ where: { IdRol: 2 } });
      const idsAprendices = aprendices.map(u => u.IdUsuario);

      // 👉 Enviar notificación a aprendices
      await enviarNotificacionGeneral({
        titulo: "Nuevo elemento en catálogo",
  mensaje: `Se ha agregado un nuevo elemento al catálogo: "${nuevoElemento.NombreElemento}"`,
  tipo: "Catalogo",
  idUsuarios: idsAprendices,
imagenUrl: `http://localhost:3001/uploads/${nuevoElemento.Imagen}`,
  RutaDestino: "alquilerap"
});
      res.status(201).json({ mensaje: 'Elemento agregado al catálogo y notificación enviada' });
    } catch (error) {
      console.error('Error al subir elemento:', error);
      res.status(500).json({ error: 'Error interno al subir el elemento' });
    }
  };

  static getCatalogo = async (_req: Request, res: Response) => {
    try {
      const elementos = await AlquilerElementos.findAll({
        where: { Observaciones: 'catalogo' },
        order: [['createdAt', 'DESC']],
      });

      res.json(elementos);
    } catch (error) {
      console.error('Error al obtener catálogo:', error);
      res.status(500).json({ error: 'Error al obtener los elementos' });
    }
  };

static actualizarImagen = async (req: Request, res: Response) => {
  try {
    const { IdAlquiler } = req.params;
    const alquiler = await AlquilerElementos.findByPk(IdAlquiler);
    if (!alquiler) {
      res.status(404).json({ error: 'Elemento no encontrado' });
      return;
    }

    if (req.file) {
      alquiler.Imagen = req.file.filename;
      await alquiler.save();
      res.json({ mensaje: 'Imagen actualizada correctamente', alquiler });
      return;
    } else {
       res.status(400).json({ error: 'No se recibió imagen' });
       return;
    }
  } catch (error) {
    console.error("Error al actualizar imagen:", error);
    res.status(500).json({ error: "Error interno al actualizar imagen" });
  }
};

static eliminarElemento = async (req: Request, res: Response) => {
  try {
    const { IdAlquiler } = req.params;
    const alquiler = await AlquilerElementos.findByPk(IdAlquiler);
    if (!alquiler) {
     res.status(404).json({ error: 'Elemento no encontrado' });
     return;
    }

    await alquiler.destroy();
    res.json({ mensaje: 'Elemento eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar elemento:", error);
    res.status(500).json({ error: "Error al eliminar el elemento" });
  }
};
}