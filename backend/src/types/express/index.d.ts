import { Usuario } from "../../models/Usuario";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        IdUsuario: number;
        IdRol?: number;
        // agrega aquí los campos que realmente usas
      };
    }
  }
}