import type { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import { checkcontrasena, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { generateJWT } from "../utils/jwt";
import { AuthEmail } from "../emails/AuthEmail";

// Controlador encargado de gestionar operaciones relacionadas con el modelo Usuario
export class UsuarioController {
  // Obtener todos los usuarios ordenados por fecha de creación
  static getAll = async (req: Request, res: Response) => {
    try {
      console.log("GET /api/usuario - Obtener todos los usuarios");
      const usuarios = await Usuario.findAll({
        order: [["createdAt", "ASC"]],
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al obtener los usuarios" });
    }
  };

  // Obtener un usuario por su ID
  static getUsuarioId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado." });
        return;
      }

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al buscar el usuario." });
    }
  };

  // Crear un nuevo usuario
  static crearUsuario = async (req: Request, res: Response) => {
    try {
      const {
        IdentificacionUsuario,
        Nombre,
        Apellido,
        Correo,
        Telefono,
        Contrasena,
        FechaRegistro,
      } = req.body;

      // Validación de campos obligatorios
      if (
        !IdentificacionUsuario ||
        !Nombre ||
        !Apellido ||
        !Correo ||
        !Telefono ||
        !Contrasena ||
        !FechaRegistro
      ) {
        res.status(400).json({ error: "Todos los campos son obligatorios" });
        return;
      }

      // Encriptar contraseña y generar token de verificación
      const hashedPassword = await hashPassword(Contrasena);
      const token = generateToken();

      // Crear usuario con estado no confirmado
      const usuario = await Usuario.create({
        IdentificacionUsuario,
        Nombre,
        Apellido,
        Correo,
        Telefono,
        Contrasena: hashedPassword,
        FechaRegistro,
        token,
        confirmed: false,
      });

      // Enviar correo de confirmación
      await AuthEmail.sendConfirmationEmail({
        Nombre: usuario.Nombre,
        Correo: usuario.Correo,
        token: usuario.token ?? "",
      });

      res.status(201).json({ mensaje: "Usuario creado correctamente" });
    } catch (error) {
      console.error("Error en crearUsuario:", error);
      res.status(500).json({ error: "Error al crear usuario." });
    }
  };

  // Actualizar usuario por ID
  static actualizarUsuarioId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado." });
        return;
      }

      await usuario.update(req.body);
      res.json("Usuario actualizado exitosamente.");
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar usuario." });
    }
  };

  // Eliminar usuario por ID
  static borrarUsuarioId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado." });
        return;
      }

      await usuario.destroy();
      res.json("Usuario eliminado exitosamente.");
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar usuario." });
    }
  };

  // Confirmar cuenta con token
  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
      res.status(401).json({ error: "Token no válido" });
      return;
    }

    usuario.confirmed = true;
    usuario.token = "";
    await usuario.save();

    res.json("Cuenta confirmada correctamente");
  };

  // Iniciar sesión
  static login = async (req: Request, res: Response) => {
    const { Correo, Contrasena } = req.body;

    const usuario = await Usuario.findOne({ where: { Correo } });

    if (!usuario) {
      res.status(409).json({ error: "Usuario no encontrado" });
      return;
    }

    if (!usuario.confirmed) {
      res.status(403).json({ error: "La cuenta no ha sido confirmada" });
      return;
    }

    const isContrasenaCorrecta = await checkcontrasena(
      Contrasena,
      usuario.Contrasena
    );

    if (!isContrasenaCorrecta) {
      res.status(401).json({ error: "Contraseña incorrecta" });
      return;
    }

    const token = generateJWT(usuario.IdUsuario);
    res.json(token);
  };

  // Solicitar cambio de contraseña
  static forgotContrasena = async (req: Request, res: Response) => {
    const { Correo } = req.body;
    const usuario = await Usuario.findOne({ where: { Correo } });

    if (!usuario) {
      res.status(409).json({ error: "Usuario no encontrado" });
      return;
    }

    usuario.token = generateToken();
    await usuario.save();

    await AuthEmail.sendContrasenaResetToken({
      Nombre: usuario.Nombre,
      Correo: usuario.Correo,
      token: usuario.token,
    });

    res.json("Revisa tu correo para instrucciones");
  };

  // Validar token de recuperación de contraseña
  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    const tokenExists = await Usuario.findOne({ where: { token } });

    if (!tokenExists) {
      res.status(404).json({ error: "Token no válido" });
      return;
    }

    res.json("Token válido...");
  };

  // Resetear contraseña usando token
  static resetpasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { Contrasena } = req.body;

    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
      res.status(404).json({ error: "Token no válido" });
      return;
    }

    usuario.Contrasena = await hashPassword(Contrasena);
    usuario.token = null;
    await usuario.save();

    res.json("La contraseña se modificó correctamente");
  };

  // Obtener usuario autenticado desde el token JWT
  static usertraer = async (req: Request, res: Response) => {
    if (!req.usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json(req.usuario);
  };
  static updateCurrentPassword = async (req: Request, res: Response) => {
  const { Actualizar_Contrasena, Contrasena } = req.body;

  if (!req.usuario) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }

  const id = req.usuario.IdUsuario;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return
    }

    const isContrasenaCorrecta = await checkcontrasena(
      Actualizar_Contrasena,
      usuario.Contrasena
    );

    if (!isContrasenaCorrecta) {
      res.status(401).json({ error: "La contraseña actual es incorrecta" });
      return;
    }

 
    const nuevaHash = await hashPassword(Contrasena); 
    usuario.Contrasena = nuevaHash;
    await usuario.save();

    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
}
