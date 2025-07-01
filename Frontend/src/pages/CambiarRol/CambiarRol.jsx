import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/Admin.css"; 
const rolesDisponibles = [
  { id: 1, nombre: "Administrador" },
  { id: 2, nombre: "Aprendiz" },
  { id: 3, nombre: "Instructor" },
];

const CambiarRol = () => {
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/api/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  const cambiarRol = async (idUsuario, nuevoRolId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3001/api/usuario/cambiar-rol/${idUsuario}`,
        { IdRol: nuevoRolId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Rol actualizado correctamente");
      obtenerUsuarios(); // refrescar lista
    } catch (err) {
      console.error("Error al cambiar rol:", err);
      alert("Error al cambiar rol");
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="cambiar-rol-container">
      <h2>🛠 Cambiar Rol de Usuarios</h2>
      {usuarios.map((usuario) => (
        <div key={usuario.IdUsuario} className="usuario-item">
          <p>
            <strong>{usuario.Nombre}</strong> ({usuario.Correo})
          </p>
          <select
            value={usuario.IdRol}
            onChange={(e) => cambiarRol(usuario.IdUsuario, e.target.value)}
          >
            {rolesDisponibles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default CambiarRol;
