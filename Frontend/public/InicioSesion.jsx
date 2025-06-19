import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/inicio.css'; // ✅ Correcto (desde /src)

import api from '../src/services/api';

const InicioSesion = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [esOlvidoContraseña, setEsOlvidoContraseña] = useState(false);

  const navigate = useNavigate();

  const manejarClickOlvidoContraseña = () => {
    setEsOlvidoContraseña(!esOlvidoContraseña);
  };

  const manejarInicioSesion = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/usuario/login', {
        Correo: correo,
        Contrasena: contrasena,
      });

      const { token, usuario } = response.data;

      console.log("🧠 Datos recibidos del backend:", response.data);

      localStorage.setItem("token", token);
      localStorage.setItem("IdUsuario", usuario.IdUsuario);

      setMensaje('✅ Inicio de sesión exitoso');
      setTipoMensaje('exito');

      navigate('/dashap');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('❌ Usuario o contraseña incorrectos');
      setTipoMensaje('error');
    }
  };

  return (
    <div className="contenedorUnico" id="body-inicio-sesion">
      <div className="logoUnico">
        <br />
      
   
      </div>

      <br /><br />
      <h2 className="tituloUnico activsena-texto">Bienvenido a ActivSena</h2>

      <form className="formularioUnico" onSubmit={manejarInicioSesion}>
        <div className="usuarioUnico">
          <input
            type="email"
            id="usuarioUnico"
            className="campoInputUnico"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label htmlFor="usuarioUnico" className="labelInputUnico">
            Correo
          </label>
        </div>

        <div className="usuarioUnico">
          <input
            type="password"
            id="passwordUnico"
            className="campoInputUnico"
            required
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <label htmlFor="passwordUnico" className="labelInputUnico">
            Contraseña
          </label>
        </div>

        <div className="olvidoContrasenaUnico">
          <button
            type="button"
            className="btnLoginUnico"
            onClick={manejarClickOlvidoContraseña}
          >
            <span></span><span></span><span></span><span></span>
            {esOlvidoContraseña ? 'Regresar al inicio de sesión' : 'Olvidé mi contraseña'}
          </button>
        </div>

        <button type="submit" className="btnLoginUnicor">
          <span></span><span></span><span></span><span></span>
          Iniciar sesión
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
          ¿No tienes cuenta?{' '}
          <a href="/registro" className="enlaceRegistroUnico">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default InicioSesion;
