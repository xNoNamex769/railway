import React, { useState } from 'react';
import "/src/pages/DetallesAlquiler/styles/DetallesAlquiler.css";
import Ballpit from "../../Backgrounds/Ballpit/Ballpit"; // Ajusta si la ruta cambia

const DetallesAlquiler = () => {
  const [registrosAlquiler, setRegistrosAlquiler] = useState([
    {
      id: 1,
      nombre: "Balón de voleibol",
      nombreAprendiz: "Juan Pérez",
      fechaEntrega: "2025-03-25",
      fechaDevolucion: "2025-04-25",
      observaciones: "En perfecto estado",
      cumplioConEntrega: true,
      codigo: "ALQ123",
      estado: "En uso"
    },
    {
      id: 2,
      nombre: "Vestido de danza",
      nombreAprendiz: "Ana Gómez",
      fechaEntrega: "2025-03-20",
      fechaDevolucion: "2025-04-20",
      observaciones: "Con algunos detalles en la tela",
      cumplioConEntrega: false,
      codigo: "ALQ124",
      estado: "Pendiente"
    },
    {
      id: 3,
      nombre: "Parques, juegos de mesa",
      nombreAprendiz: "Carlos López",
      fechaEntrega: "2025-03-30",
      fechaDevolucion: "2025-04-30",
      observaciones: "Buen estado, sin daños",
      cumplioConEntrega: true,
      codigo: "ALQ125",
      estado: "En uso"
    },
    {
      id: 4,
      nombre: "Balón de fútbol",
      nombreAprendiz: "Marta Ramírez",
      fechaEntrega: "2025-03-28",
      fechaDevolucion: "2025-04-28",
      observaciones: "Agujero pequeño",
      cumplioConEntrega: false,
      codigo: "ALQ126",
      estado: "Pendiente"
    },
  ]);

  const [searchNombre, setSearchNombre] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchFechaEntrega, setSearchFechaEntrega] = useState('');
  const [searchFechaDevolucion, setSearchFechaDevolucion] = useState('');

  const eliminarRegistro = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
    if (confirmar) {
      setRegistrosAlquiler(registrosAlquiler.filter(registro => registro.id !== id));
    }
  };

  const filteredRegistros = registrosAlquiler.filter((registro) => {
    return (
      registro.nombre.toLowerCase().includes(searchNombre.toLowerCase()) &&
      registro.nombreAprendiz.toLowerCase().includes(searchNombre.toLowerCase()) &&
      registro.codigo.toLowerCase().includes(searchId.toLowerCase()) &&
      registro.fechaEntrega.includes(searchFechaEntrega) &&
      registro.fechaDevolucion.includes(searchFechaDevolucion)
    );
  });

  return (
    <>
      <div className="contenedor-alquiler">

        {/* Encabezado animado */}
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Ballpit />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
            textShadow: '0 0 10px black',
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            Registros de Préstamos
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="barra-busqueda">
          <div className="campos-busqueda">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por Nombre del Elemento o Aprendiz"
              value={searchNombre}
              onChange={(e) => setSearchNombre(e.target.value)}
            />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por Código de Alquiler"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <input
              type="date"
              className="search-input"
              value={searchFechaEntrega}
              onChange={(e) => setSearchFechaEntrega(e.target.value)}
            />
            <input
              type="date"
              className="search-input"
              value={searchFechaDevolucion}
              onChange={(e) => setSearchFechaDevolucion(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla de registros */}
        <table className="tabla-alquiler">
          <thead>
            <tr>
              <th>Elemento</th>
              <th>Aprendiz</th>
              <th>Código de Alquiler</th>
              <th>Estado</th>
              <th>Fecha de Entrega</th>
              <th>Fecha de Devolución</th>
              <th>Observaciones</th>
              <th>¿Cumplió con la entrega?</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistros.length > 0 ? (
              filteredRegistros.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.nombre}</td>
                  <td>{registro.nombreAprendiz}</td>
                  <td>{registro.codigo}</td>
                  <td>{registro.estado}</td>
                  <td>{registro.fechaEntrega}</td>
                  <td>{registro.fechaDevolucion}</td>
                  <td>{registro.observaciones}</td>
                  <td className={`estado-cumplimiento ${registro.cumplioConEntrega ? 'true' : 'false'}`}>
                    {registro.cumplioConEntrega ? 'Sí' : 'No'}
                  </td>
                  <td>
                    <button className="btn-eliminar" onClick={() => eliminarRegistro(registro.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="mensaje-sin-registros">
                  No se encontraron registros que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DetallesAlquiler;
