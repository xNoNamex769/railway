import React from "react";
import {
  FaCalendarAlt,
  FaDiscourse,
  FaHome,
  FaTimes,
  FaCheckSquare,
  FaTasks,
} from "react-icons/fa";
import logo from "../img/logo.png";
import Folder from "../../../../Components/Folder/Folder";

export default function MenuLateralIn({ menuAbierto, toggleMenu, setContenidoActual }) {
  return (
    <aside className={`barradash ${menuAbierto ? "mostrar" : "ocultar"}`}>
      <section className="Clogodash">
        <img src={logo} alt="Logodash" className="logodash" />
        <h2 className="titulodash">Dashboard</h2>

        <button className="iconodash subirdash" onClick={toggleMenu}>
          <FaTimes />
        </button>
      </section>

      <nav className="menudash">
        <button onClick={() => setContenidoActual("userviewin")} className="opciondash">
          <FaHome className="iconodash" />
          Inicio
        </button>
        <button onClick={() => setContenidoActual("actividades")} className="opciondash">
          <FaHome className="iconodash" />
          Actividades
        </button>
        <button onClick={() => setContenidoActual("aplicacion")} className="opciondash">
          <FaHome className="iconodash" />
          Eventos
        </button>
       
      
        <button onClick={() => setContenidoActual("comprobar")} className="opciondash">
          <FaDiscourse className="iconodash" />
          FeedBack
        </button>
        <button onClick={() => setContenidoActual("calendario")} className="opciondash">
          <FaCalendarAlt className="iconodash" />
          Calendario
        </button>
        <button onClick={() => setContenidoActual("aprendiz")} className="opciondash">
          <FaCalendarAlt className="iconodash" />
          Constancia de Aprendiz
        </button>
        <button onClick={() => setContenidoActual("registro")} className="opciondash">
          <FaCalendarAlt className="iconodash" />
          Registro QR
        </button>
        <button onClick={() => setContenidoActual("cartacontacto")} className="opciondash">
          <FaCalendarAlt className="iconodash" />
          Contactos
        </button>
        <button onClick={() => setContenidoActual("chromagrid")} className="opciondash">
          <FaCalendarAlt className="iconodash" />
          Aprobados
        </button>

        <div className="folder-dash-container">
       <Folder
  items={[
    { id: "planevento", nombre: "Eventos" },
    { id: "alquiler", nombre: "Alquiler" },
    { id: "registrarl", nombre: " lúdicas" }
  ]}
  color="#30ee0a"
  size={1}
  onSelectItem={(itemId) => setContenidoActual(itemId)}
/>

        </div>

        <img src={logo} alt="" />
      </nav>
    </aside>
  );
}
