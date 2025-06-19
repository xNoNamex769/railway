import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Tus imports existentes...
import MenuLateralAp from "../src/pages/DashBoard/DashBoardComponents/DashAp/MenuLateralAp";
import HomeDash from "../src/pages/DashBoard/HomeDash";
import ActivBot from "../src/pages/DashBoard/DashBoardComponents/DashA/ActivBot";
//import NavbarAp from "../src/pages/DashBoard/DashBoardComponents/DashAp/NavbarAp";
import Alquiler from "../src/pages/Alquiler/Alquiler";
import Feedbacks from "../src/pages/Feedback/Feedbacks";
import Ludicas from "../src/pages/Ludicas/Ludicas";
import HorasLudicas from "../src/pages/HorasLudicas/HorasLudicas";
import Combinar from "../src/pages/CombinarFA/Combinar";
import ChatAI from "../src/pages/ChatAI/ChatAI";
import AlquilerAP from "../src/pages/AlquierAP/AlquilerAP";
import CartaContacto from "../src/pages/CartasContacto/CartaContacto";
import Constanciacr from "../src/pages/ConstanciaCertificado/ConstanciaCR";
import UserViewAp from "../src/pages/UserView/UserViewAp";
import Actividades from "../src/pages/Actividades/Actividades";
import Aplicacion from "../src/pages/Aplicacion/Aplicacion";
import ConfigViewAp from "../src/pages/ConfigView/ConfigViewAp";
import CalendarioAp from "../src/pages/CalendarioAdmin/CalendarioAp";
import EscanerQR from "../src/Components/QrGenerador.jsx/EscanerHtml5QR";
import Constancia from "../src/pages/Constancia/components/ConstanciasList";
import Footer from "../src/pages/Home/FooterHome";

import "../src/styles/BotHp.css";
import "../src/styles/ColaViento.css";
import "../src/styles/Resposive.css";
import "../src/styles/global.css";

export default function DashBoard() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [contenidoActual, setContenidoActual] = useState("userviewap");
  const [validando, setValidando] = useState(true);

  const navigate = useNavigate();

  // ✅ FUNCIÓN PARA CERRAR SESIÓN
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("IdUsuario");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const IdUsuario = localStorage.getItem("IdUsuario");

    if (!token || !IdUsuario) {
      alert("⚠️ Debes iniciar sesión primero");
      navigate("/");
    } else {
      setValidando(false);
    }
  }, [navigate]);

  if (validando) {
    return (
      <div
        style={{ textAlign: "center", paddingTop: "5rem", fontSize: "1.5rem" }}
      >
        Validando sesión... 🔐
      </div>
    );
  }

  return (
    <section className="contenedordash">
      <MenuLateralAp
        menuAbierto={menuAbierto}
        toggleMenu={() => setMenuAbierto(!menuAbierto)}
        setContenidoActual={setContenidoActual}
      />

      <main className="contenidodash">

        <NavbarAp
          toggleMenu={() => setMenuAbierto(!menuAbierto)}
          setContenidoActual={setContenidoActual}
          cerrarSesion={cerrarSesion} // 👈 Prop clave para cerrar sesión
        />

         
        {contenidoActual === "userviewap" && <UserViewAp />}
        {contenidoActual === "actividades" && <Actividades />}
        {contenidoActual === "aplicacion" && <Aplicacion />}
        {contenidoActual === "ludicas" && <Ludicas />}
        {contenidoActual === "horasl" && <HorasLudicas />}
        {contenidoActual === "feedback" && <Feedbacks />}
        {contenidoActual === "constancia" && <Constancia />}
        {contenidoActual === "alquiler" && <Alquiler />}
        {contenidoActual === "combinar" && <Combinar />}
        {contenidoActual === "chatai" && <ChatAI />}
        {contenidoActual === "alquilerap" && <AlquilerAP />}
        {contenidoActual === "cartacontacto" && <CartaContacto />}
        {contenidoActual === "constanciacr" && <Constanciacr />}
        {contenidoActual === "perfil" && <HomeDash />}
        {contenidoActual === "config" && <ConfigViewAp />}
        {contenidoActual === "escanerqr" && <EscanerQR />}
        {contenidoActual === "calendario" && <CalendarioAp />}
        {contenidoActual === "userview" && <UserViewAp setContenidoActual={setContenidoActual} />}
      </main>

      <ActivBot irAChatai={() => setContenidoActual("chatai")} />
    </section>
  );
}
