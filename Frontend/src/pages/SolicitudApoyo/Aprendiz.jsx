import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import "./style/Aprendiz.css";

const obtenerIdAprendiz = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.IdUsuario;
};

const Aprendiz = () => {
  const [solicitud, setSolicitud] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [TipoAyuda, setTipoAyuda] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [editando, setEditando] = useState(false);

  const IdAprendiz = obtenerIdAprendiz();

  useEffect(() => {
    if (!IdAprendiz) return;

    axios.get(`http://localhost:3001/api/solicitudapoyo`)
      .then((res) => {
        const solicitudDelUsuario = res.data.find((s) => s.IdUsuario === IdAprendiz);
        if (solicitudDelUsuario) {
          setSolicitud(solicitudDelUsuario);
          setTipoAyuda(solicitudDelUsuario.TipoAyuda);
          setDescripcion(solicitudDelUsuario.Descripcion);

          axios.get(`http://localhost:3001/api/historial/solicitud/${solicitudDelUsuario.IdSolicitud}`)
            .then((resHistorial) => setHistorial(resHistorial.data))
            .catch((err) => console.error("Error al cargar historial:", err));
        }
      })
      .catch((err) => console.error("Error al cargar solicitud:", err));
  }, [IdAprendiz]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosSolicitud = {
      IdUsuario: IdAprendiz,
      TipoAyuda,
      Descripcion,
      Estado: "pendiente"
    };

    if (editando && solicitud) {
      axios.put(`http://localhost:3001/api/solicitudapoyo/${solicitud.IdSolicitud}`, datosSolicitud)
        .then((res) => {
          setSolicitud(res.data);
          setEditando(false);
        })
        .catch((err) => console.error("Error al editar solicitud:", err));
    } else {
      axios.post('http://localhost:3001/api/solicitudapoyo', datosSolicitud)
        .then((res) => {
          setSolicitud(res.data);
        })
        .catch((err) => console.error("Error al crear solicitud:", err));
    }
  };

  const handleEliminar = () => {
    if (solicitud && window.confirm("¿Estás seguro de eliminar tu solicitud?")) {
      axios.delete(`http://localhost:3001/api/solicitudapoyo/${solicitud.IdSolicitud}`)
        .then(() => {
          setSolicitud(null);
          setHistorial([]);
          setTipoAyuda('');
          setDescripcion('');
        })
        .catch((err) => console.error("Error al eliminar solicitud:", err));
    }
  };

  return (
    <div className="panel">
      <h2>Mi Solicitud de Apoyo</h2>

      {!solicitud || editando ? (
        <form onSubmit={handleSubmit} className="formulario-apoyo">
          <h3>{editando ? "Editar Solicitud" : "Enviar nueva solicitud"}</h3>

          <label>
            Tipo de Ayuda:
            <select value={TipoAyuda} onChange={(e) => setTipoAyuda(e.target.value)} required>
              <option value="">-- Seleccionar --</option>
              <option value="Psicológica">Psicológica</option>
              <option value="Emocional">Emocional</option>
              <option value="Económica">Económica</option>
            </select>
          </label>

          <label>
            Descripción:
            <textarea value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          </label>

          <button type="submit">{editando ? "Guardar Cambios" : "Enviar Solicitud"}</button>

          {editando && (
            <button type="button" className="cancelar-btn" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          )}
        </form>
      ) : (
        <>
          <p><strong>Tipo de Ayuda:</strong> {solicitud.TipoAyuda}</p>
          <p><strong>Descripción:</strong> {solicitud.Descripcion}</p>
          <p><strong>Estado Actual:</strong> <span className={`estado-${solicitud.Estado?.toLowerCase()}`}>{solicitud.Estado}</span></p>

          <div className="botones-acciones">
            <button onClick={() => setEditando(true)}>✏️ Editar</button>
            <button onClick={handleEliminar} className="eliminar-btn">🗑️ Eliminar</button>
          </div>

          <h3>Seguimiento / Historial</h3>
          <div className="historial-container">
            {historial.length > 0 ? (
              historial.map((h, index) => (
                <div className="historial-card" key={index}>
                  <div className="historial-encabezado">
                    <span className={`estado-label ${h.EstadoNuevo.toLowerCase()}`}>
                      {h.EstadoNuevo}
                    </span>
                    <span className="historial-fecha">
                      {new Date(h.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="historial-comentario">
                    <strong>Comentario:</strong> {h.Comentario || <em>Sin comentario</em>}
                  </p>
                  <p className="historial-atendido">
                    <strong>Atendido por:</strong> {h.usuario?.Nombre} ({h.usuario?.rol?.NombreRol})
                  </p>
                </div>
              ))
            ) : (
              <p>No hay historial aún.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Aprendiz;
