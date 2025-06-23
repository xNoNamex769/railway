import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style/Instructor.css"

import {jwtDecode} from 'jwt-decode';

const obtenerIdInstructor = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.IdUsuario; // asegúrate que este campo existe en el token
};

const Instructor = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/solicitudapoyo') // Ajusta tu ruta real
      .then((res) => setSolicitudes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const manejarCambio = async (solicitud) => {
  try {
    const IdInstructor = obtenerIdInstructor(); 

    if (!IdInstructor) {
      alert("Error: no se pudo obtener el ID del instructor logueado");
      return;
    }

    // Actualiza la solicitud
   await axios.put(`http://localhost:3001/api/solicitudapoyo/${solicitud.IdSolicitud}`, {
  Estado: solicitud.estado
});


    // Registra en el historial
    await axios.post(`http://localhost:3001/api/historial`, {
      IdSolicitud: solicitud.IdSolicitud,
      EstadoNuevo: solicitud.estado,
      Comentario: solicitud.comentario,
      IdUsuario: IdInstructor
    });

    alert('Solicitud actualizada y registrada en historial');
  } catch (error) {
    console.error('Error al actualizar y registrar historial', error);
  }
};


  return (
    <div>
      {solicitudes.map((s, index) => (
        <div key={index} className="solicitud">
          <h3>{s.usuario?.Nombre} - {s.TipoAyuda}</h3>
          <p>{s.Descripcion}</p>

          <label>Comentario al aprendiz:</label>
         <textarea
  value={s.comentario || ''}
  onChange={(e) =>
    setSolicitudes((prev) =>
      prev.map((sol) =>
        sol.IdSolicitud === s.IdSolicitud
          ? { ...sol, comentario: e.target.value }
          : sol
      )
    )
  }
/>


          <label>Estado:</label>
          <select
            value={s.estado || s.Estado}
            onChange={(e) =>
              setSolicitudes((prev) =>
                prev.map((sol, i) =>
                  i === index ? { ...sol, estado: e.target.value } : sol
                )
              )
            }
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Atendido">Atendido</option>
            <option value="Finalizado">Finalizado</option>
          </select>

          <button onClick={() => manejarCambio(s)}>Guardar cambios</button>
        </div>
      ))}
    </div>
  );
};

export default Instructor;
