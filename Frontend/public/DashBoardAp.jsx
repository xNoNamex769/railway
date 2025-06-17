import React, { useState } from "react";
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
import Constancia from "../src/pages/Constancia/components/ConstanciasList"; 
import Footer from "../src/pages/Home/FooterHome";

import "../src/styles/BotHp.css";
import "../src/styles/ColaViento.css";
import "../src/styles/Resposive.css";
import "../src/styles/global.css";

export default function DashBoard() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [contenidoActual, setContenidoActual] = useState("userviewap");

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <section className="contenedordash">
      <MenuLateralAp
        menuAbierto={menuAbierto}
        toggleMenu={toggleMenu}
        setContenidoActual={setContenidoActual}
      />

      <main className="contenidodash">
         

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
        {contenidoActual === "calendario" && <CalendarioAp />}
        {contenidoActual === "userview" && <UserViewAp setContenidoActual={setContenidoActual} />}
      </main>

      <ActivBot irAChatai={() => setContenidoActual("chatai")} />
    </section>
  );
}
