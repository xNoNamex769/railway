import React, { useState } from "react";
import axios from "axios";
import "./style/FormularioCatalogo.css"; 
const FormularioCatalogo = () => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");
const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !imagen) {
      setMensaje("Debes ingresar el nombre del elemento y seleccionar una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("NombreElemento", nombre);
    formData.append("imagen", imagen);

    try {
      await axios.post("http://localhost:3001/api/alquilerelementos/catalogo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMensaje("Elemento subido exitosamente al catálogo.");
      setNombre("");
      setImagen(null);
    } catch (error) {
      console.error("Error al subir elemento:", error);
      setMensaje("Hubo un error al subir el elemento.");
    }
  };

  return (
    <div className="formulario-catalogo">
      <h2>Agregar nuevo elemento al catálogo</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Nombre del elemento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
       onChange={(e) => {
  const file = e.target.files[0];
  setImagen(file);
  if (file) {
    setPreview(URL.createObjectURL(file));
  } else {
    setPreview(null);
  }
}}

        />{preview && (
  <div className="preview-container">
    <p>Vista previa de la imagen:</p>
    <img src={preview} alt="preview" className="preview-imagen" />
  </div>
)}

        <button type="submit">Subir elemento</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default FormularioCatalogo;
