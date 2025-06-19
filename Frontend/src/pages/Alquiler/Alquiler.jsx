import React, { useState } from 'react';
import { getDecodedToken } from '../../utils/getDecodedToken'; 
import QRGeneradorPrestamo from '../../Components/QrGenerador.jsx/QRGeneradorPrestamo';
import "./styles/Alquiler.css";

import voleibolImg from './img/voleibol.webp';
import juegosMesaImg from './img/juegos_mesa.jpg';
import danzaImg from './img/danza.jpg';
import futbolImg from './img/futbol.jpg';

const AlquilerApp = () => {
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
  const [mostrarQR, setMostrarQR] = useState(false);

  const decodedToken = getDecodedToken(); // ← obtener usuario autenticado
  const IdUsuario = decodedToken?.IdUsuario;

  const elementosDisponibles = [
    { id: 1, nombre: "Balón de voleibol", descripcion: "Balón de voleibol profesional", disponible: true, imagen: voleibolImg },
    { id: 2, nombre: "Parques, juegos de mesa", descripcion: "Diversión para todo público", disponible: true, imagen: juegosMesaImg },
    { id: 3, nombre: "Vestidos de danza", descripcion: "Elegantes vestidos de danza", disponible: false, imagen: danzaImg },
    { id: 4, nombre: "Balón de fútbol", descripcion: "Balón de fútbol de alta calidad", disponible: true, imagen: futbolImg },
  ];

  const activarQR = (elemento) => {
    setElementoSeleccionado(elemento);
    setMostrarQR(true);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Alquiler de Elementos</h1>
      </header>

      <section className="elementos-container">
        {elementosDisponibles.map((elemento) => (
          <div
            key={elemento.id}
            className={`elemento ${!elemento.disponible ? 'no-disponible' : ''}`}
            onClick={() => elemento.disponible && activarQR(elemento)}
          >
            <img src={elemento.imagen} alt={elemento.nombre} className="imagen-elemento" />
            <h3>{elemento.nombre} {!elemento.disponible && "(No disponible)"}</h3>
            <p>{elemento.descripcion}</p>
          </div>
        ))}
      </section>

      {mostrarQR && (
        <div className="modal-qr">
          <div className="modal-contenido">
            <QRGeneradorPrestamo 
              IdElemento={elementoSeleccionado?.id || 1}
              IdUsuario={IdUsuario}
            />
            <button onClick={() => setMostrarQR(false)} className="cerrar-modal">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlquilerApp;
