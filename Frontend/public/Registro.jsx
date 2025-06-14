import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/registro.css';

import api from '../src/services/api';

const Registro = () => {
  const [formulario, setFormulario] = useState({
    IdentificacionUsuario: '',
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    Contrasena: '',
    FechaRegistro: new Date().toISOString().split('T')[0],
  });

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Registrar usuario
      const response = await api.post('/usuario', formulario);

      setMensaje('✅ Registro exitoso. Se ha enviado un token de verificación.');
      setTipoMensaje('exito');

      // Opcional: guardar el correo para usarlo en la verificación
      localStorage.setItem('correoParaVerificar', formulario.Correo);

      // Redirige a la página para ingresar el token
      setTimeout(() => navigate('/verificar-token'), 2000);
    } catch (error) {
      console.error('Error al registrar:', error);
      setMensaje('❌ Error al registrar. Verifica los campos');
      setTipoMensaje('error');
    }
  };

  return (
    <div className="contenedorUnico" id="body-inicio-sesion">
      <div className="logoUnico">
        <br />
     
      </div>
      <br /><br />
      <h2 className="tituloUnico registro-activsena">Regístrate en ActivSena</h2>

      <form className="formularioUnico" onSubmit={handleSubmit}>
        <div className="usuarioUnico">
          <input
            type="text"
            name="IdentificacionUsuario"
            className="campoInputUnico"
            required
            value={formulario.IdentificacionUsuario}
            onChange={handleChange}
          />
          <label className="labelInputUnico">Identificación</label>
        </div>

        <div className="usuarioUnico">
          <input
            type="text"
            name="Nombre"
            className="campoInputUnico"
            required
            value={formulario.Nombre}
            onChange={handleChange}
          />
          <label className="labelInputUnico">Nombre</label>
        </div>

        <div className="usuarioUnico">
          <input
            type="text"
            name="Apellido"
            className="campoInputUnico"
            required
            value={formulario.Apellido}
            onChange={handleChange}
          />
          <label className="labelInputUnico">Apellido</label>
        </div>

        <div className="usuarioUnico">
          <input
            type="email"
            name="Correo"
            className="campoInputUnico"
            required
            value={formulario.Correo}
            onChange={handleChange}
          />
          <label className="labelInputUnico">Correo</label>
        </div>

        <div className="usuarioUnico">
          <input
            type="tel"
            name="Telefono"
            className="campoInputUnico"
            required
            value={formulario.Telefono}
            onChange={handleChange}
          />
          <label className="labelInputUnico">Teléfono</label>
        </div>

        <div className="usuarioUnico">
          <input
            type="password"
            name="Contrasena"
            className="campoInputUnico"
            required
            value={formulario.Contrasena}
            onChange={handleChange}
          />
          <label className="labelInputUnico contrasena-registro">Contraseña</label>
        </div>

        <div className="usuarioUnico">
          <input
            type="date"
            name="FechaRegistro"
            className="campoInputUnico"
            required
            value={formulario.FechaRegistro}
            onChange={handleChange}
          />
          <label className="labelInputUnico fecha-registro">Fecha de Registro</label>
        </div>

        <button type="submit" className="btnLoginUnicor">
          <span></span><span></span><span></span><span></span>
          Registrarse
        </button>
      </form>

      {mensaje && (
        <p
          className={tipoMensaje === 'exito' ? 'mensaje-exito' : 'mensaje-error'}
          style={{ textAlign: 'center', marginTop: '1rem' }}
        >
          {mensaje}
        </p>
      )}

      <br />

      <div className="registroUnico">
        <p className="textoRegistroUnico">
          ¿Ya tienes cuenta?{' '}
          <a href="/iniciosesion" className="enlaceRegistroUnico">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
