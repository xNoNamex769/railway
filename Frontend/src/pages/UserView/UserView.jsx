import React, { useEffect, useRef, useState } from "react";
import avatar from "../DashBoard/img/avatar.png";
import ludicaImg from "./img/bl.png";
import ludicaImg2 from "./img/ft.png";
import ludicaImg3 from "./img/gm.png";
import ludicaImg4 from "./img/ms.png";
import EventoImg from "./img/director.png";
import EventoImg2 from "./img/cacao.jpg";
import EventoImg3 from "./img/academia.jpg";
import EventoImg4 from "./img/emprende.png";
import logo from "./img/image.png";
import "./styles/UserView.css";
import axios from "axios";

export default function UserView({ setContenidoActual }) {
  const fetched = useRef(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchUsuario = async () => {
      try {
        const usuarioGuardado = sessionStorage.getItem("usuario");
        if (usuarioGuardado) {
          setUsuario(JSON.parse(usuarioGuardado));
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const id = payload.IdUsuario;

        const res = await axios.get(`http://localhost:3001/api/usuario/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(res.data);
        sessionStorage.setItem("usuario", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error cargando usuario:", err);
      }
    };

    fetchUsuario();
  }, []);

  return (
    <section className="UserContenedor">
      {!usuario ? (
        <p>Cargando datos del usuario...</p>
      ) : (
        <div className="UserCuadro UserInfo">
          <img src={avatar} alt="Avatar" className="UserAvatar" />
          <h2 className="UserNombre">
            <strong>Nombre: </strong>{usuario.Nombre} {usuario.Apellido}
          </h2>
          <p className="UserRol">
            <strong>Aprendizaje: </strong>{usuario?.perfilAprendiz?.ProgramaFormacion || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Rol: </strong>{usuario?.rol?.NombreRol || "Sin rol"}
          </p>
          <p className="UserRol">
            <strong>Ficha: </strong>{usuario?.perfilAprendiz?.Ficha || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Jornada: </strong>{usuario?.perfilAprendiz?.Jornada || "No aplica"}
          </p>
          <p className="UserRol">
            <strong>Teléfono: </strong>{usuario?.Telefono}
          </p>
          <p className="UserCorreo">
            <strong>Correo Electrónico: </strong>{usuario?.Correo}
          </p>
          <img src={logo} className="UserLogo" alt="Logo SENA" />

          <button className="UserBoton" onClick={() => setContenidoActual("config")}>
            Editar perfil
          </button>
        </div>
      )}

      {/* Las secciones de Lúdicas y Eventos quedan igual */}
      {/* ... */}
    </section>
  );
}
