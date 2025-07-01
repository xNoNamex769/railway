import React, { useState } from 'react';
import "./styles/DetallesAlquiler.css";

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

  const filteredRegistros = registrosAlquiler.filter((registro) =>
    registro.nombre.toLowerCase().includes(searchNombre.toLowerCase()) &&
    registro.nombreAprendiz.toLowerCase().includes(searchNombre.toLowerCase()) &&
    registro.codigo.toLowerCase().includes(searchId.toLowerCase()) &&
    registro.fechaEntrega.includes(searchFechaEntrega) &&
    registro.fechaDevolucion.includes(searchFechaDevolucion)
  );

  return (
    <div className="contenedor-alquiler">
      {/* Encabezado */}
      <header className="titulo-alquiler">
        <h1>📋 Registros de Préstamos</h1>
        <p style={{ fontWeight: 'normal', fontSize: '1.1rem', color: '#555' }}>
          Consulta, filtra o elimina los registros de alquiler de elementos
        </p>
      </header>

      {/* Barra de búsqueda */}
      <div className="barra-busqueda">
        <div className="campos-busqueda">
          <input
            type="text"
            className="search-input"
            placeholder="Elemento o Aprendiz"
            value={searchNombre}
            onChange={(e) => setSearchNombre(e.target.value)}
          />
          <input
            type="text"
            className="search-input"
            placeholder="Código"
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

      {/* Tabla */}
      <table className="tabla-alquiler">
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Aprendiz</th>
            <th>Código</th>
            <th>Estado</th>
            <th>Entrega</th>
            <th>Devolución</th>
            <th>Observaciones</th>
            <th>¿Cumplió?</th>
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
                <td className={`estado ${registro.estado.toLowerCase()}`}>
                  {registro.estado}
                </td>
                <td>{registro.fechaEntrega}</td>
                <td>{registro.fechaDevolucion}</td>
                <td>{registro.observaciones}</td>
                <td className={`estado-cumplimiento ${registro.cumplioConEntrega ? 'true' : 'false'}`}>
                  {registro.cumplioConEntrega ? 'Sí' : 'No'}
                </td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarRegistro(registro.id)}
                  >
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
  );
};

export default DetallesAlquiler;
