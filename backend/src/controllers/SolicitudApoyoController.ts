import { Request, Response } from "express";
import { SolicitudApoyo } from "../models/SolicitudApoyo";
import { Usuario } from "../models/Usuario";
import { RolUsuario } from "../models/RolUsuario";

export class SolicitudApoyoController {
  static getAllSolicitudApoyo = async (req: Request, res: Response) => {
    try {
      console.log(" Entrando a getAllSolicitudApoyo...");

      const solicitudesApoyos = await SolicitudApoyo.findAll({
        include: [
          {
            model: Usuario,
            attributes: ["Nombre", "Correo"],
            include: [
              {
                model: RolUsuario,
                attributes: ["NombreRol"],
                as: "rol", // asegúrate de que esté igual que en el modelo
              },
            ],
          },
        ],
      });

      res.json(solicitudesApoyos);
    } catch (error) {
      console.error("❌ Error en getAllSolicitudApoyo:", error);
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };

  static getSolicitudApoyoId = async (req: Request, res: Response) => {
    try {
      const { IdSolicitud } = req.params;
      const solicitudDelApoyo = await SolicitudApoyo.findOne({
        where: { IdSolicitud },
      });

      if (!solicitudDelApoyo) {
        res.status(404).json({ error: "Solicitud de apoyo no encontrada" });
        return;
      }

      res.json(solicitudDelApoyo);
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };

 static CrearSolicitudApoyo = async (req: Request, res: Response) => {
  try {
    const { IdUsuario, TipoAyuda, Descripcion, Estado } = req.body;

    if (!IdUsuario || !TipoAyuda || !Descripcion || !Estado) {
      res.status(400).json({ error: "Datos incompletos" });
      return;
    }

    const solicitudDelApoyo = await SolicitudApoyo.create({
      IdUsuario,
      TipoAyuda,
      Descripcion,
      Estado,
    });

    res.status(201).json(solicitudDelApoyo); 
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    res.status(500).json({ error: "Hubo un error al crear la solicitud de apoyo" });
  }
};


  static actualizarSolicitudAopoyo = async (req: Request, res: Response) => {
    try {
      const { IdSolicitud } = req.params;
      const solicitudDelApoyo = await SolicitudApoyo.findByPk(IdSolicitud);

      if (!solicitudDelApoyo) {
        res.status(404).json({ error: "Solicitud de apoyo no encontrada" });
        return;
      }

      await solicitudDelApoyo.update(req.body);
res.json(solicitudDelApoyo); // devuelve el objeto actualizado

    } catch (error) {
      console.error("Error al actualizar solicitud de apoyo", error);
      res.status(500).json({ error: "Hubo un error al actualizar la solicitud de apoyo" });
    }
  };

  static eliminarSolicitudApoyo = async (req: Request, res: Response) => {
    try {
      const { IdSolicitud } = req.params;
      const solicitudDelApoyo = await SolicitudApoyo.findByPk(IdSolicitud);

      if (!solicitudDelApoyo) {
       res.status(404).json({ error: "Solicitud de apoyo no encontrada" });
       return;
      }

      await solicitudDelApoyo.destroy();
      res.json("Solicitud de apoyo eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la solicitud de apoyo", error);
      res.status(500).json({ error: "Hubo un error al eliminar la solicitud de apoyo" });
    }
  };
}
