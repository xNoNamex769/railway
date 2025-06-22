// Importamos React y hooks necesarios
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Actividades.css'; // Importamos estilos propios

// Importamos imágenes locales para mostrar por defecto
import fondo1Img from '../Alquiler/img/fondo1.jpg';
import fondo2Img from '../Alquiler/img/fondo2.jpg';
import fondo3Img from '../Alquiler/img/fondo3.jpg';
import fondo4Img from '../Alquiler/img/fondo4.jpg';
import fondo5Img from '../Alquiler/img/fondo5.jpg';
import bienestar_aprendizImg from '../Alquiler/img/bienestar_aprendiz.webp';

// Arreglo de imágenes por defecto (si una actividad no tiene imagen asignada)
const imagenes = [fondo1Img, fondo2Img, fondo3Img, fondo4Img, fondo5Img];

// Función para formatear fechas en español (ej: "21 de junio de 2025")
const formatearFecha = (fechaStr) => {
  if (!fechaStr) return "";
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
};

// Función para formatear horas al formato 12h (ej: "1:30 PM")
const formatearHora = (horaStr) => {
  if (!horaStr) return "";
  const [hora, min] = horaStr.split(':');
  let h = parseInt(hora, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${min} ${ampm}`;
};

// Función que devuelve el rango de fechas de la semana actual (de lunes a domingo)
function obtenerLimitesSemanaActual() {
  const hoy = new Date();
  const dia = hoy.getDay(); // 0=Domingo, 1=Lunes...
  const diferenciaLunes = dia === 0 ? 6 : dia - 1;

  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - diferenciaLunes);
  lunes.setHours(0, 0, 0, 0);

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  domingo.setHours(23, 59, 59, 999);

  return { lunes, domingo };
}

// Componente principal
export default function Actividades() {
  const [actividades, setActividades] = useState([]); // Estado para todas las actividades
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null); // Actividad abierta en el modal
  const [mostrarFeedback, setMostrarFeedback] = useState(false); // Mostrar u ocultar textarea
  const [feedback, setFeedback] = useState(""); // Comentario ingresado por el usuario

  // Obtener actividades desde el backend al cargar el componente
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/actividad");
        setActividades(res.data);
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };
    fetchActividades();
  }, []);

  // Filtrar solo las actividades que estén dentro de la semana actual
  const { lunes, domingo } = obtenerLimitesSemanaActual();
  const actividadesSemana = actividades.filter((actividad) => {
    const fechaInicio = new Date(actividad.FechaInicio);
    return fechaInicio >= lunes && fechaInicio <= domingo;
  });

  // Abrir el modal con detalles de una actividad
  const abrirModal = (actividad) => {
    setActividadSeleccionada(actividad);
    setMostrarFeedback(false);
    setFeedback("");
  };

  // Cerrar el modal
  const cerrarModal = () => {
    setActividadSeleccionada(null);
    setMostrarFeedback(false);
  };

  // Manejar escritura del feedback
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Enviar comentario de feedback al backend
  const enviarFeedback = async () => {
    if (!feedback.trim()) {
      alert("Por favor escribe tu feedback antes de enviar.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/feedback", {
        IdActividad: actividadSeleccionada.IdActividad,
        comentario: feedback,
      });

      alert("✅ ¡Gracias por tu feedback!");
      setMostrarFeedback(false);
      setFeedback("");
    } catch (error) {
      console.error("Error enviando feedback:", error);
      alert("❌ Hubo un error al enviar el feedback.");
    }
  };

  // Si no hay actividades esta semana, mostrar mensaje
  if (actividadesSemana.length === 0) {
    return (
      <div className="contenedor-sena">
        <header className="cabecera">
          <h1 className="actividad-parrafo">🎯 Actividades - SENA</h1>
          <p className="descripcion">Explora las actividades semanales pensadas para tu bienestar y formación integral.</p>
        </header>
        <section className="introduccion">
          <h2 className="parrafo">¿Qué hay de Nuevo?</h2>
          <h3 className="agenda">📅 Agenda Semanal</h3>
        </section>
        <p style={{ textAlign: "center", fontSize: "1.2rem", marginTop: "2rem" }}>
          No hay actividades registradas para esta semana.
        </p>
      </div>
    );
  }

  return (
    <div className="contenedor-sena">
      <header className="cabecera">
        <h1 className="actividad-parrafo">🎯 Actividades - SENA</h1>
        <p className="descripcion">Explora las actividades semanales pensadas para tu bienestar y formación integral.</p>
      </header>

      <section className="introduccion">
        <h2 className="parrafo">¿Qué hay de Nuevo?</h2>
        <h3 className="agenda">📅 Agenda Semanal</h3>
      </section>

      {/* Galería con tarjetas de actividades */}
      <main className="galeria-actividades">
        {actividadesSemana.map((actividad, index) => (
          <article
            key={actividad.IdActividad || index}
            className="tarjeta"
            onClick={() => abrirModal(actividad)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                actividad.Imagen
                  ? `http://localhost:3001/uploads/${actividad.Imagen}`
                  : imagenes[index % imagenes.length]
              }
              alt={actividad.NombreActi || 'Imagen de actividad'}
              className="imagen-principal"
            />
            <span className="nuevo-badge">NUEVO</span>
            <img src={bienestar_aprendizImg} alt="Logo Bienestar" className="logo-flotante" />
            <div className="actividad-info">
              <h4>{actividad.NombreActi || "Sin nombre"}</h4>
              <p>{actividad.Descripcion || "Sin descripción disponible."}</p>
              <p>
                📍 {actividad.Ubicacion || "Ubicación no definida"} - ⏰{" "}
                {formatearHora(actividad.HoraInicio)} a {formatearHora(actividad.HoraFin)}
              </p>
              <p>🗓️ {formatearFecha(actividad.FechaInicio)}</p>
            </div>
          </article>
        ))}
      </main>

      {/* Modal para detalles + Feedback */}
      {actividadSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>×</button>

            <img
              src={
                actividadSeleccionada.Imagen
                  ? `http://localhost:3001/uploads/${actividadSeleccionada.Imagen}`
                  : bienestar_aprendizImg
              }
              alt={actividadSeleccionada.NombreActi}
              style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }}
            />

            <h2>{actividadSeleccionada.NombreActi}</h2>
            <p><strong>Descripción:</strong> {actividadSeleccionada.Descripcion}</p>
            <p><strong>Ubicación:</strong> {actividadSeleccionada.Ubicacion}</p>
            <p><strong>Horario:</strong> {formatearHora(actividadSeleccionada.HoraInicio)} a {formatearHora(actividadSeleccionada.HoraFin)}</p>
            <p><strong>Fecha:</strong> {formatearFecha(actividadSeleccionada.FechaInicio)}</p>

            {/* Botón para mostrar el formulario de feedback */}
            {!mostrarFeedback && (
              <button
                className="btn-feedback"
                onClick={() => setMostrarFeedback(true)}
                style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                📝 Dar Feedback
              </button>
            )}

            {/* Formulario de feedback */}
            {mostrarFeedback && (
              <div style={{ marginTop: "1rem" }}>
                <textarea
                  rows="4"
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Escribe tu feedback aquí..."
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                  }}
                />
                <div style={{ marginTop: "0.5rem" }}>
                  <button
                    onClick={enviarFeedback}
                    style={{ padding: "0.5rem 1rem", marginRight: "10px", cursor: "pointer" }}
                  >
                    Enviar
                  </button>
                  <button
                    onClick={() => setMostrarFeedback(false)}
                    style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
