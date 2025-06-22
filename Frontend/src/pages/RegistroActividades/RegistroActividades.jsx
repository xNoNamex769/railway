// Importaciones necesarias 
import React, { useState, useEffect } from "react";
import "./style/RegistroActividades.css"; // Estilos del componente
import cuadradoImg from './img/cuadrado.jpg'; // Imagen por defecto para vista previa
import axios from "axios";

// Componente principal que registra una actividad
const ActivityRegistration = ({ onRegister }) => {
  // Estado que contiene los datos del formulario
  const [activityData, setActivityData] = useState({
    activityName: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",

    location: "",
    capacity: "",
    organizer: "",
    infoLink: "",
    image: cuadradoImg, // Imagen por defecto hasta que el usuario suba otra
    IdEvento: "",
  });

  const [imageFile, setImageFile] = useState(null); // Imagen real seleccionada por el usuario
  const [showModal, setShowModal] = useState(false); // Controla si se muestra el modal de confirmación
  const [eventos, setEventos] = useState([]); // Lista de eventos disponibles para asociar a la actividad

  // Carga la lista de eventos al montar el componente
  useEffect(() => {
    axios.get("http://localhost:3001/api/evento")
      .then(res => setEventos(res.data))
      .catch(err => console.error("Error cargando eventos", err));
  }, []);

  // Actualiza los campos del formulario al escribir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  // Maneja la selección de una imagen y genera su vista previa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setActivityData({ ...activityData, image: imageURL }); // Vista previa
      setImageFile(file); // Imagen real para subir al backend
    }
  };

  // Maneja la validación del formulario antes de mostrar el modal
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (activityData.startTime >= activityData.endTime) {
      alert("⚠️ La hora de inicio debe ser anterior a la hora de fin.");
      return;
    }
    if (!activityData.IdEvento) {
      alert("⚠️ Debes seleccionar un evento.");
      return;
    }

    setShowModal(true); // Mostrar modal de confirmación
  };

  // Confirma el envío de datos al backend
  const handleConfirm = async () => {
    setShowModal(false);

    try {
      const formData = new FormData();

      // Aseguramos que las horas tengan formato completo (HH:MM:SS)
      const startTime = activityData.startTime.length === 5
        ? `${activityData.startTime}:00`
        : activityData.startTime;
      const endTime = activityData.endTime.length === 5
        ? `${activityData.endTime}:00`
        : activityData.endTime;

      // Agregamos los datos del formulario al objeto FormData
      formData.append("NombreActi", activityData.activityName);
      formData.append("Descripcion", activityData.description);
      formData.append("FechaInicio", activityData.date);
      formData.append("FechaFin", activityData.date);
      formData.append("HoraInicio", startTime);
      formData.append("HoraFin", endTime);
      formData.append("TipoLudica", "Recreativa"); // Valor fijo, puedes hacerlo dinámico si quieres
      formData.append("IdEvento", activityData.IdEvento);
      formData.append("Ubicacion", activityData.location);
    

      if (imageFile) {
        formData.append("Imagen", imageFile); // Subimos imagen si se selecciono
      }

      // Enviamos los datos al backend
      await axios.post("http://localhost:3001/api/actividad", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Actividad registrada con éxito");

      // Opcional: aggg hptaaaaaa si queremos resetear el formulario 
    } catch (error) {
      console.error("❌ Error al registrar actividad:", error);
      alert("Hubo un error al registrar la actividad.");
    }
  };

  // Cierra el modal sin enviar los datos
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="activity-wrapper">
      {/* Vista previa de la imagen */}
      <div className="image-container">
        <img src={activityData.image} alt="Vista previa" className="preview-image" />
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* Formulario principal de registro */}
      <div className="activity-container">
        <h2>📅 Registro de Actividad</h2>
        <form onSubmit={handleSubmit}>
          <label>
            🏆 Nombre de la actividad
            <input
              type="text"
              name="activityName"
              value={activityData.activityName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            📝 Descripción de la actividad
            <textarea
              name="description"
              value={activityData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </label>

          <label>
            📅 Fecha
            <input
              type="date"
              name="date"
              value={activityData.date}
              onChange={handleChange}
              required
            />
          </label>

          {/* Horarios */}
          <div className="time-container">
            <label>
              ⏰ Hora de inicio
              <input
                type="time"
                name="startTime"
                value={activityData.startTime}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              ⏳ Hora de fin
              <input
                type="time"
                name="endTime"
                value={activityData.endTime}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            📍 Ubicación
            <input
              type="text"
              name="location"
              value={activityData.location}
              onChange={handleChange}
              required
            />
          </label>
           

          {/* Lista de eventos para seleccionar */}
          <label>
            📌 Selecciona el evento
            <select
              name="IdEvento"
              value={activityData.IdEvento}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecciona un evento --</option>
              {eventos.map((evento) => (
                <option key={evento.IdEvento} value={evento.IdEvento}>
                  {evento.NombreEvento}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">✅ Registrar Actividad</button>
        </form>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirma la información de la actividad</h3>
            <p><strong>Nombre:</strong> {activityData.activityName}</p>
            <p><strong>Descripción:</strong> {activityData.description}</p>
            <p><strong>Fecha:</strong> {activityData.date}</p>
            <p><strong>Hora inicio:</strong> {activityData.startTime}</p>
            <p><strong>Hora fin:</strong> {activityData.endTime}</p>
            <p><strong>Ubicación:</strong> {activityData.location}</p>
            <p>
              <strong>Evento:</strong>{" "}
              {eventos.find(e => e.IdEvento === parseInt(activityData.IdEvento))?.NombreEvento || ""}
            </p>

            <div className="modal-buttons">
              <button onClick={handleConfirm}>Aceptar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityRegistration;
