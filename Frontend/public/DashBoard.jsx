import React, { useState } from "react";
import MenuLateral from "../src/pages/DashBoard/DashBoardComponents/DashA/MenuLateral";
import HomeDash from "../src/pages/DashBoard/HomeDash";
import ActivBot from "../src/pages/DashBoard/DashBoardComponents/DashA/ActivBot";
import Alquiler from "../src/pages/Alquiler/Alquiler";
import CalendarioAdmin from "../src/pages/CalendarioAdmin/CalendarioAp";
import DetallesAlquiler from "../src/pages/DetallesAlquiler/DetallerAlquiler";
import ConstanciaCertificado from "../src/pages/ConstanciaCertificado/ConstanciaCR";
import Actividades from "../src/pages/Actividades/Actividades";
import Aplicacion from "../src/pages/Aplicacion/Aplicacion";
import ConstanciasList from "../src/pages/Constancia/components/ConstanciasList";
import Combinar from "../src/pages/CombinarFA/Combinar";
import CartaContacto from "../src/pages/CartasContacto/CartaContacto";
import ChatAI from '../src/pages/ChatAI/ChatAI';
import UserView from "../src/pages/UserView/UserView";
import Navbar from "../src/pages/DashBoard/DashBoardComponents/DashA/Navbar";
import ConfigView from "../src/pages/ConfigView/ConfigView";
import AnalisisIA from "../src/pages/AnalisisIA/AnalisisIA";

import "../src/styles/BotHp.css";
import "../src/styles/ColaViento.css";
import "../src/styles/Resposive.css";
import "../src/styles/global.css";
import "../src/styles/fondo.css";
import GestionCatalogo from "../src/pages/AlquierAP/GestionFormulario";
import FormularioCatalogo from "../src/pages/AlquierAP/FormularioCatalogo";

export default function DashBoard() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [contenidoActual, setContenidoActual] = useState("userview");

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <section className="contenedordash">
      <MenuLateral
        menuAbierto={menuAbierto}
        toggleMenu={toggleMenu}
        setContenidoActual={setContenidoActual}
      />

      <main className="contenidodash">
        <Navbar
          toggleMenu={toggleMenu}
          setContenidoActual={setContenidoActual}
        />

        {contenidoActual === "userview" && <UserView setContenidoActual={setContenidoActual} />}
        {contenidoActual === "actividad" && <Actividades />}
        {contenidoActual === "aplicacion" && <Aplicacion />}
        {contenidoActual === "calendario" && <CalendarioAdmin />}
        {contenidoActual === "registroa" && <Alquiler />}
        {contenidoActual === "detallea" && <DetallesAlquiler />}
        {contenidoActual === "combinar" && <Combinar />}
        {contenidoActual === "constancia" && <ConstanciaCertificado />}
        {contenidoActual === "constancia2" && <ConstanciasList />}
        {contenidoActual === "cartacontacto" && <CartaContacto />}
        {contenidoActual === "chatai" && <ChatAI />}
        {contenidoActual === "config" && <ConfigView />}
        {contenidoActual === "analisisia" && <AnalisisIA />}
         {contenidoActual === "gestioncatalogo" && <GestionCatalogo />}
      {contenidoActual === "formulariocatalogo" && <FormularioCatalogo />}
        {contenidoActual === "perfil" && <HomeDash />}
      </main>

      <ActivBot irAChatai={() => setContenidoActual("chatai")} />
    </section>
  );
}
