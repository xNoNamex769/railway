import { Router } from "express";
import { io } from "../socket"
import { NotificacionController } from "../controllers/NotificacionesController";
const router = Router();
router.post("/test-socket", (req, res) => {
  const { titulo, mensaje, IdUsuario } = req.body;

 io.emit("nuevaNotificacion", {
  Titulo: titulo || "🔔 Noti de prueba",
  Mensaje: mensaje || "Esta es una prueba con Socket.IO",
  IdUsuario: IdUsuario || 6 // puedes poner un default mientras pruebas
});
  res.json({ ok: true, mensaje: "📡 Notificación enviada con socket.io" });
});
router.post("/", NotificacionController.crear);
router.get("/:idUsuario", NotificacionController.listarPorUsuario);
router.put("/confirmar/:id", NotificacionController.confirmar);

export default router;
