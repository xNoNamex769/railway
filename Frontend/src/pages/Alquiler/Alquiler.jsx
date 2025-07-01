import React, { useEffect } from 'react';
import "./styles/Alquiler.css"


const elementosMock = [
  {
    nombre: "Silla plegable",
    descripcion: "Silla blanca ideal para eventos al aire libre.",
    imagen: "/img/silla.jpg",
    disponible: true,
  },
  {
    nombre: "Carpa 3x3",
    descripcion: "Carpa resistente al agua, fácil de montar.",
    imagen: "/img/carpa.jpg",
    disponible: false,
  },
  {
    nombre: "Mesa redonda",
    descripcion: "Mesa de plástico con capacidad para 6 personas.",
    imagen: "/img/mesa.jpg",
    disponible: true,
  },
  {
    nombre: "Proyector HD",
    descripcion: "Proyector para presentaciones y cine al aire libre.",
    imagen: "/img/proyector.jpg",
    disponible: true,
  },
  {
    nombre: "Equipo de sonido",
    descripcion: "Sonido profesional con bluetooth y micrófono.",
    imagen: "/img/sonido.jpg",
    disponible: true,
  }
];

export default function AlquilerPage({ elementos = elementosMock }) {
  useEffect(() => {
    document.body.classList.add('body-alquiler');
    return () => {
      document.body.classList.remove('body-alquiler');
    };
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Catálogo de Alquiler</h1>
        <p>Explora y alquila los elementos disponibles</p>
      </header>

      {/* Carrusel de destacados */}
      <section className="carrusel">
        {Array.isArray(elementos) && elementos.slice(0, 5).map((el, index) => (
          <div key={index} className="elemento">
            <img src={el.imagen} alt={el.nombre} />
            <h3>{el.nombre}</h3>
            <p className="descripcion-elemento-unico">{el.descripcion}</p>
          </div>
        ))}
      </section>

      {/* Listado completo */}
      {Array.isArray(elementos) && elementos.length > 0 ? (
        <section className="elementos-container">
          {elementos.map((el, index) => (
            <div
              key={index}
              className={`elemento ${!el.disponible ? 'no-disponible' : ''}`}
            >
              <img src={el.imagen} alt={el.nombre} />
              <h3>{el.nombre}</h3>
              <p className="descripcion-elemento-unico">{el.descripcion}</p>
            </div>
          ))}
        </section>
      ) : (
        <p style={{ textAlign: 'center' }}>No hay elementos disponibles.</p>
      )}

      {/* Formulario de solicitud */}
      <section className="formulario-container">
        <div className="formulario-content">
          <div className="formulario-izquierda">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="Tu nombre completo" />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              rows="4"
              placeholder="Especifica lo que necesitas..."
            ></textarea>

            <button type="submit">Enviar solicitud</button>
          </div>

          <div className="formulario-derecha">
            <img
              src="/img/alquiler-form.jpg"
              alt="Formulario ilustración"
              className="imagen-elemento-formulario"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
