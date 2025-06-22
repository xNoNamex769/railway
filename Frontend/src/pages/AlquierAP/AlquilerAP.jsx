import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/AlquilerAP.css"; 
import bienestar from "../../../public/img/fondo1.jpeg"

const Alquiler = () => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/alquilerelementos/catalogo").then((res) => {
      setImagenes(res.data);
    });
  }, []);

  const placeholders = [
    "futbol.jpg",
    "baloncesto.jpg",
    "danza.jpg",
    "parques.jpg",
    "domino.png",
    "juegos_mesa.jpg",
    "sapo.jpg",
    "logo-sena.png",
  ];

  const itemsCarrusel = [...imagenes];

  while (itemsCarrusel.length < 8) {
    const i = itemsCarrusel.length;
    itemsCarrusel.push({
      Imagen: placeholders[i],
      NombreElemento: "Disponible",
      esPlaceholder: true,
    });
  }

  return (
    <>
  <h1 className="texto-unico-elemento titulo-principal"> Prestamo De Elementos</h1>
    <div className="body-alquiler-ap ">
     
      <div className="box">
       
        {itemsCarrusel.map((img, index) => (
          <span key={index} style={{ "--i": index + 1 }}>
            <img
              src={
                img.esPlaceholder
                  ? (`/img/${img.Imagen}`)
                  : `http://localhost:3001/uploads/${img.Imagen}`
              }
              alt={img.NombreElemento}
              className="img-alquiler-catalogo"
            />
          </span>
        ))}
      
      </div>
      
      
    </div>
   <main className="bienvenida-bienestar">
  <div className="bienvenida-texto">
    <h2>¡Bienvenido al área de Préstamo de Elementos!</h2>
    <p>
      Aquí puedes explorar todos los elementos disponibles que Bienestar al Aprendiz tiene para ti.
      Si deseas hacer uso de algún elemento, dirígete directamente al área de Bienestar.
    </p>
    <p className="ubicacion-destacada">📍 ¡Te esperamos en Bienestar del Aprendiz!</p>
  </div>
  <div className="bienvenida-imagen">
    <img
      src={bienestar}
      alt="Ubicación Bienestar"
      className="ubicacion-elemento"
    />
  </div>
</main>

      </>
  );
};

export default Alquiler;
