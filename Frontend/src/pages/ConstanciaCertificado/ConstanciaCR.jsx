import React, { useState } from "react";
import "./style/Constancia.css";

const ConstanciaSENA = ({ totalHoras = 0, objetivo = 80 }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    nivel: "",
    especialidad: "",
    ciudad: "",
    dia: "",
    mes: "",
    año: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const haCumplido = totalHoras >= objetivo;

  return (
    <div className="constancia-wrapper">
      {haCumplido ? (
        <div className="constancia-container">
          <h1 className="titulo">CONSTANCIA DE HORAS LÚDICAS</h1>

          <p className="texto">
            El Servicio Nacional de Aprendizaje - <span className="negrita">SENA</span> certifica que el aprendiz:
          </p>

          <input
            type="text"
            name="nombre"
            className="input-text"
            placeholder="Nombre del Aprendiz"
            value={formData.nombre}
            onChange={handleChange}
          />

          <p className="texto">
            Identificado con el documento No.{" "}
            <input
              type="text"
              name="documento"
              className="input-text"
              placeholder="Número de Documento"
              value={formData.documento}
              onChange={handleChange}
            />
            , ha cumplido satisfactoriamente con el total de <strong>{objetivo} horas</strong> lúdicas requeridas durante su proceso de formación.
          </p>

          <p className="texto">
            Su proceso de formación corresponde al nivel{" "}
            <input
              type="text"
              name="nivel"
              className="input-text"
              placeholder="Nivel de Formación"
              value={formData.nivel}
              onChange={handleChange}
            />{" "}
            en la especialidad de{" "}
            <input
              type="text"
              name="especialidad"
              className="input-text"
              placeholder="Especialidad"
              value={formData.especialidad}
              onChange={handleChange}
            />.
          </p>

          <p className="texto">
            Se expide la presente constancia en{" "}
            <input
              type="text"
              name="ciudad"
              className="input-text"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={handleChange}
            />
            , a los{" "}
            <input
              type="text"
              name="dia"
              className="input-text"
              placeholder="Día"
              value={formData.dia}
              onChange={handleChange}
            />{" "}
            días del mes de{" "}
            <input
              type="text"
              name="mes"
              className="input-text"
              placeholder="Mes"
              value={formData.mes}
              onChange={handleChange}
            />{" "}
            de{" "}
            <input
              type="text"
              name="año"
              className="input-text"
              placeholder="Año"
              value={formData.año}
              onChange={handleChange}
            />.
          </p>

          <div className="firmas">
            <div>
              <p className="subrayado">Firma Coordinador Académico</p>
              <p className="nombre-firma">Nombre Coordinador</p>
            </div>
            <div>
              <p className="subrayado">Firma Director Regional</p>
              <p className="nombre-firma">Nombre Director</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mensaje-no-cumplido">
          <h2>😕 Aún no puedes generar tu constancia</h2>
          <p>
            Actualmente has completado <strong>{totalHoras}</strong> de <strong>{objetivo}</strong> horas requeridas.
          </p>
          <p>¡Sigue participando en las actividades lúdicas y pronto podrás generar tu certificado! 💪</p>
        </div>
      )}
    </div>
  );
};

export default ConstanciaSENA;
