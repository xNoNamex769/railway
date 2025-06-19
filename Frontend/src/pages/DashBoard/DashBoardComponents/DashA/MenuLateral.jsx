import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaDiscourse,
  FaHome,
  FaTimes,
  FaRegCheckCircle,
  FaAlignJustify,
  FaUserGraduate,
} from "react-icons/fa";

import React from "react";



import logo from "../img/logo.png";
import avatar from "../img/avatar.png";

export default function MenuLateral({ menuAbierto, toggleMenu, setContenidoActual }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const toggleDropdown = () => {
    setMostrarMenu((prev) => !prev);
  };

  const irAPerfil = () => {
    setContenidoActual("perfil");
    setMostrarMenu(false);
  };

  const irConfig = () => {
    setContenidoActual("config");
    setMostrarMenu(false);
  };


  return (
    <aside className={`barradash ${menuAbierto ? "mostrar" : "ocultar"}`}>

      <section className="Clogodash">
        <div className="UserHeaderInfo" onClick={toggleDropdown}>
          <img src={avatar} alt="Usuario" className="avatardash" />
          <span className="nombredash">Administrador</span>
        </div>
        <button className="subirdash" onClick={toggleMenu}>
          <FaTimes />
        </button>

        {mostrarMenu && (
          <div className="menudesplegabledash">
            <ul>
              <li className="opcionesm" onClick={irAPerfil}>Perfil</li>
              <li className="opcionesm" onClick={irConfig}>Configuración</li>
              <li className="opcionesm" >Cerrar sesión</li>
            </ul>
          </div>
        )}
      </section>

      {/* Menú lateral */}
      <nav className="menudash">
        <button onClick={() => setContenidoActual("userview")} className="opciondash">
          <FaHome className="iconodash" />
          Inicio
        </button>
        <button onClick={() => setContenidoActual("actividad")} className="opciondash">
          <FaHome className="iconodash" />
          Actividades
        </button>
        <button onClick={() => setContenidoActual("aplicacion")} className="opciondash">
          <FaHome className="iconodash" />
          Eventos
        </button>
        <button onClick={() => setContenidoActual("calendario")} className="opciondash">
          <FaCalendarAlt className="iconodash" />
          Solicitudes
        </button>
        <button onClick={() => setContenidoActual("registroa")} className="opciondash">
          <FaRegCheckCircle className="iconodash" />
          Registro Alquiler
        </button>
        <button onClick={() => setContenidoActual("detallea")} className="opciondash">
          <FaAlignJustify className="iconodash" />
          Detalles Alquiler
        </button>
        <button onClick={() => setContenidoActual("combinar")} className="opciondash">
          <FaDiscourse className="iconodash" />
          FeedBack
        </button>
        <button onClick={() => setContenidoActual("constancia2")} className="opciondash">
          <FaUserGraduate className="iconodash" />
          ConstanciaAD
        </button>

         <button
          onClick={() => setContenidoActual("cartacontacto")}
            className="opciondash"
           >
            <FaCalendarAlt className="iconodash" />
           Contactos
                </button>
                 <button
          onClick={() => setContenidoActual("cartacontacto")}
            className="opciondash"
           >
            <FaCalendarAlt className="iconodash" />
           Contactos
                </button>
                 <button
          onClick={() => setContenidoActual("analisisia")}
            className="opciondash"
           >
            <FaCalendarAlt className="iconodash" />
           Analisisia
                </button>

        <button onClick={() => setContenidoActual("cartacontacto")} className="opciondash">
          <FaCalendarAlt className="iconodash" />
          Contactos
        </button>

        <img src={logo} alt="Logo" />
      </nav>
    </aside>
  );
}
