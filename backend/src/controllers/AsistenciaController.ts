import { Op } from "sequelize";

import type { Request, Response } from "express";
import { Asistencia } from "../models/Asistencia";
import { Actividad } from "../models/Actividad";
import { calcularHoras } from "../utils/CalcularHoras";

import { Evento } from "../models/Evento";
import { Usuario } from "../models/Usuario";

export class AsistenciaControllers {
  static getAsistenciaAll = async (req: Request, res: Response) => {
    try {
      console.log('Desde GET /api/Asistencia');
      const asistencia = await Asistencia.findAll({
        order: [['AsiFecha', 'ASC']],
      });
      res.json(asistencia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error' });
    }
  };

  static getIdAsistencia = async (req: Request, res: Response) => {
    try {
      const { AsiId } = req.params;
      const asistencia = await Asistencia.findByPk(AsiId);
      if (!asistencia) {
        res.status(404).json({ error: 'Asistencia no encontrada' });
        return;
      }
      res.json(asistencia);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener la Asistencia' });
    }
  };

  static crearAsistencia = async (req: Request, res: Response) => {
    try {
      const asistencia = await Asistencia.create(req.body);
      res.status(201).json({
        msg: 'Asistencia creada exitosamente',
        asistencia,
      });
    } catch (error) {
      console.error('Error al crear asistencia:', error);
      res.status(500).json({ error: 'Hubo un error al crear la Asistencia' });
    }
  };

  static actualizarIdAsistencia = async (req: Request, res: Response) => {
    try {
      const { AsiId } = req.params;
      const asistencia = await Asistencia.findByPk(AsiId);
      if (!asistencia) {
        res.status(404).json({ error: 'Asistencia no encontrada' });
        return;
      }
      await asistencia.update(req.body);
      res.json('Asistencia actualizada correctamente');
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al actualizar la Asistencia' });
    }
  };

  static eliminarIdAsistencia = async (req: Request, res: Response) => {
    try {
      const { AsiId } = req.params;
      const asistencia = await Asistencia.findByPk(AsiId);
      if (!asistencia) {
        res.status(404).json({ error: 'Asistencia no encontrada' });
        return;
      }
      await asistencia.destroy();
      res.json('Asistencia eliminada correctamente');
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al eliminar la Asistencia' });
    }
  };




 




static getHistorialAsistenciaPorUsuario = async (req: Request, res: Response) => {
  const { IdUsuario } = req.params;

  try {
    // 1. Traer todas las actividades con su evento asociado
    const actividades = await Actividad.findAll({
      include: [{ model: Evento }],
      order: [['createdAt', 'ASC']],
    });

    // 2. Mapear el historial actividad por actividad
    const historial = await Promise.all(
      actividades.map(async (actividad) => {
        // Buscar si existe asistencia para esta actividad y usuario
        const asistencia = await Asistencia.findOne({
          where: {
            IdUsuario,
            IdActividad: actividad.IdActividad,
          },
          include: [
            { model: Usuario, as: 'usuario' },
            { model: Usuario, as: 'RegistradorEntrada' },
            { model: Usuario, as: 'RegistradorSalida' },
          ],
        });
        if (!asistencia) return null;
        // Preparar los datos del historial
        return {
          actividad: actividad.NombreActi,
          fecha: actividad.evento?.FechaInicio
            ? new Date(actividad.evento.FechaInicio).toISOString().split("T")[0]
            : "Sin fecha",
          evento: actividad.evento?.NombreEvento || "Sin evento",

          entrada: asistencia?.AsiEntrada || false,
          entradaRegistradaPor: asistencia?.RegistradorEntrada?.Nombre || "---",
          entradaHora: asistencia?.AsiHoraEntrada
            ? new Date(asistencia.AsiHoraEntrada).toLocaleString("es-CO")
            : "---",

          salida: asistencia?.QRSalida ? true : false,
          salidaRegistradaPor: asistencia?.RegistradorSalida?.Nombre || "---",
          salidaHora:
            asistencia?.QRSalida && !isNaN(new Date(asistencia.QRSalida).getTime())
              ? new Date(asistencia.QRSalida).toLocaleString("es-CO")
              : "---",

          estado:
            asistencia?.AsiEntrada && asistencia?.QRSalida
              ? "Completa"
              : "Incompleta",
        };
      })
    );
    const historialFiltrado = historial.filter((item) => item !== null);

    res.json(historialFiltrado);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ error: "Hubo un error al generar el historial." });
  }
};

static registrarDesdeQR = async (req: Request, res: Response) => {
  try {
    const IdUsuario = req.usuario?.IdUsuario;
    const { IdActividad, tipo } = req.body;

    const idRegistrador = IdUsuario;

    if (!IdUsuario || !IdActividad || !tipo) {
      res.status(400).json({ error: "Faltan datos del QR o del token." });
      return;
    }

    const usuario = await Usuario.findByPk(IdUsuario);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    let asistencia = await Asistencia.findOne({
      where: { IdUsuario, IdActividad },
    });

    // Si no existe la asistencia, se crea
    if (!asistencia) {
      asistencia = await Asistencia.create({
        IdUsuario,
        IdActividad,
        tipo,
        AsiFecha: new Date(),
        QREntrada: tipo === "entrada" ? new Date() : null,
        QRSalida: tipo === "salida" ? new Date() : null,
        IdRegistradorEntrada: tipo === "entrada" ? idRegistrador : null,
        IdRegistradorSalida: tipo === "salida" ? idRegistrador : null,
        AsiEntrada: tipo === "entrada",
        AsiHoraEntrada: tipo === "entrada" ? new Date() : null,
        AsiEstado: tipo === "entrada" ? "Incompleta" : null,
      });

      res.status(201).json({
        mensaje: `✅ ${tipo === "entrada" ? "Entrada" : "Salida"} registrada para ${usuario.Nombre}`,
        asistencia,
        usuario: {
          IdUsuario: usuario.IdUsuario,
          Nombre: usuario.Nombre,
        },
      });
      return;
    }

    // Ya existe la asistencia, actualizar
    if (tipo === "entrada") {
      if (asistencia.QREntrada) {
        res.status(400).json({ error: "⚠️ Ya existe una entrada registrada para este usuario." });
        return;
      }

      asistencia.QREntrada = new Date();
      asistencia.AsiEntrada = true;
      asistencia.AsiHoraEntrada = new Date();
     if (typeof idRegistrador === 'number') {
  asistencia.IdRegistradorEntrada = idRegistrador;
}

      asistencia.AsiEstado = "Incompleta";

    } else if (tipo === "salida") {
      if (!asistencia.QREntrada) {
        res.status(400).json({ error: "⚠️ Debes registrar entrada antes de la salida." });
        return;
      }

      if (asistencia.QRSalida) {
        res.status(400).json({ error: "⚠️ Ya existe una salida registrada para este usuario." });
        return;
      }

      asistencia.QRSalida = new Date();
     if (typeof idRegistrador === 'number') {
  asistencia.IdRegistradorSalida = idRegistrador;
}


      const entrada = new Date(asistencia.QREntrada);
      const salida = new Date(asistencia.QRSalida);
      asistencia.AsiHorasAsistidas = calcularHoras(entrada, salida);
      asistencia.AsiEstado = "Completa";

    } else {
      res.status(400).json({ error: "Tipo inválido (entrada o salida)" });
      return;
    }

    await asistencia.save();

    res.status(200).json({
      mensaje: `✅ ${tipo === "entrada" ? "Entrada registrada" : "Salida registrada y asistencia completa"}`,
      asistencia,
      usuario: {
        IdUsuario: usuario.IdUsuario,
        Nombre: usuario.Nombre,
      },
    });
    return;

  } catch (error) {
    console.error("❌ Error en registrarDesdeQR:", error);
    res.status(500).json({ error: "Error al registrar asistencia desde QR" });
    return;
  }
};


static obtenerAsistenciasPorActividad = async (req: Request, res: Response) => {
  try {
    const { IdActividad } = req.params;

    if (!IdActividad) {
      res.status(400).json({ error: "Falta el IdActividad en la URL." });
      return;
    }

    const asistencias = await Asistencia.findAll({
      where: { IdActividad },
      include: [
        {
          model: Usuario,
          as: "usuario", // alias definido en relaciones
          attributes: ["IdUsuario", "Nombre", "Correo"]
        },
        {
          model: Usuario,
          as: "RegistradorEntrada",
          attributes: ["IdUsuario", "Nombre"]
        },
        {
          model: Usuario,
          as: "RegistradorSalida",
          attributes: ["IdUsuario", "Nombre"]
        }
      ],
      order: [["AsiFecha", "ASC"]]
    });

    res.status(200).json(asistencias);
    return;
  } catch (error) {
    console.error("❌ Error al obtener asistencias:", error);
    res.status(500).json({ error: "Error al obtener asistencias por actividad." });
    return;
  }
};
}