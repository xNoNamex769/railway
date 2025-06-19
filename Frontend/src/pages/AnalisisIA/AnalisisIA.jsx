import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AnalisisIA.css"; // Creamos este CSS luego

export default function AnalisisIA() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/analisisia/inteligencia/resumen")
      .then((res) => setEventos(res.data))
      .catch((err) => console.error("Error al obtener análisis:", err));
  }, []);

  const getEstadoColor = (asistieron, confirmados) => {
    if (confirmados === 0) return "gris";
    const ratio = asistieron / confirmados;
    if (ratio >= 0.8) return "verde";
    if (ratio >= 0.5) return "amarillo";
    return "rojo";
  };

  return (
    <div className="analisis-container">
      <h2>Análisis Inteligente de Eventos</h2>
      <div className="tarjetas-container">
        {eventos.map((evento) => (
          <div
            key={evento.IdEvento}
            className={`tarjeta evento-${getEstadoColor(evento.Asistieron, evento.Confirmados)}`}
          >
            <h3>{evento.NombreEvento}</h3>
            <p><strong>Asistieron:</strong> {evento.Asistieron}</p>
            <p><strong>Confirmados:</strong> {evento.Confirmados}</p>
            <p><strong>Inasistencias:</strong> {evento.Inasistencias}</p>
            <p><strong>Recursos:</strong> {evento.Recursos || "N/A"}</p>
            <p><strong>Promedio Feedback:</strong> {evento.FeedbackPromedioLargo || "N/A"}</p>

            {evento.Recomendaciones?.length > 0 && (
              <div className="recomendaciones">
                <strong>Recomendaciones:</strong>
                <ul>
                  {evento.Recomendaciones.map((r, index) => (
                    <li key={index}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
