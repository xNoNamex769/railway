import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/registro.css';
import api from '../src/services/api';

// ICONOS SVG
const IconoUsuario = () => (
  <svg className="icono-input-registro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconoCorreo = () => (
  <svg className="icono-input-registro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const IconoTelefono = () => (
  <svg className="icono-input-registro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconoClave = () => (
  <svg className="icono-input-registro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconoTarjeta = () => (
  <svg className="icono-input-registro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Registro = () => {
  const [formulario, setFormulario] = useState({
    IdentificacionUsuario: '',
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    Contrasena: '',
    FechaRegistro: new Date().toISOString().split('T')[0],
    aceptaTerminos: false,
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const validarCampo = (nombre, valor) => {
    const nuevosErrores = { ...errores };

    switch (nombre) {
      case 'IdentificacionUsuario':
        if (!valor) nuevosErrores[nombre] = 'Campo obligatorio';
        else if (!/^\d{1,50}$/.test(valor)) nuevosErrores[nombre] = 'Debe contener solo números (máx 50)';
        else delete nuevosErrores[nombre];
        break;
      case 'Nombre':
      case 'Apellido':
        if (!valor) nuevosErrores[nombre] = 'Campo obligatorio';
        else if (valor.length > 100) nuevosErrores[nombre] = 'Máx 100 caracteres';
        else delete nuevosErrores[nombre];
        break;
      case 'Correo':
        if (!valor) nuevosErrores[nombre] = 'Campo obligatorio';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) nuevosErrores[nombre] = 'Correo inválido';
        else delete nuevosErrores[nombre];
        break;
      case 'Contrasena':
        if (!valor) nuevosErrores[nombre] = 'Campo obligatorio';
        else if (valor.length < 6) nuevosErrores[nombre] = 'Mínimo 6 caracteres';
        else delete nuevosErrores[nombre];
        break;
      default:
        break;
    }

    setErrores(nuevosErrores);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === 'checkbox' ? checked : value;

    setFormulario({ ...formulario, [name]: nuevoValor });

    if (type !== 'checkbox') {
      validarCampo(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    // Validar todos los campos
    Object.keys(formulario).forEach((campo) => {
      if (campo !== 'Telefono' && campo !== 'aceptaTerminos') {
        validarCampo(campo, formulario[campo]);
      }
    });

    if (Object.keys(errores).length === 0 && formulario.aceptaTerminos) {
      try {
        const response = await api.post('/usuario', formulario);

        setMensaje('✅ Registro exitoso. Se ha enviado un token de verificación.');
        setTipoMensaje('exito');
        localStorage.setItem('correoParaVerificar', formulario.Correo);

        setTimeout(() => navigate('/verificar-token'), 2000);
      } catch (error) {
        console.error('Error al registrar:', error);
        setMensaje('❌ Error al registrar. Verifica los campos.');
        setTipoMensaje('error');
      }
    } else {
      setMensaje('❌ Corrige los errores e intenta nuevamente.');
      setTipoMensaje('error');
    }

    setCargando(false);
  };

  return (
    <div className="contenedor-registro">
      <h2 className="tituloUnico registro-activsena">Regístrate en ActivSena</h2>

      <form className="formulario-registro" onSubmit={handleSubmit}>
        {/* Campo Identificación */}
        <div className="grupo-campo-registro">
          <label>Identificación*</label>
          <div className="contenedor-input-registro">
            <IconoTarjeta />
            <input
              type="text"
              name="IdentificacionUsuario"
              placeholder="Número de identificación"
              className={`campo-input-registro ${errores.IdentificacionUsuario ? "campo-invalido-registro" : ""}`}
              value={formulario.IdentificacionUsuario}
              onChange={handleChange}
              required
            />
          </div>
          {errores.IdentificacionUsuario && <p className="mensaje-error-registro">{errores.IdentificacionUsuario}</p>}
        </div>

        {/* Nombre y Apellido */}
        <div className="grilla-campos-registro">
          <div className="grupo-campo-registro">
            <label>Nombre*</label>
            <div className="contenedor-input-registro">
              <IconoUsuario />
              <input
                type="text"
                name="Nombre"
                placeholder="Tu nombre"
                className={`campo-input-registro ${errores.Nombre ? "campo-invalido-registro" : ""}`}
                value={formulario.Nombre}
                onChange={handleChange}
                required
              />
            </div>
            {errores.Nombre && <p className="mensaje-error-registro">{errores.Nombre}</p>}
          </div>

          <div className="grupo-campo-registro">
            <label>Apellido*</label>
            <div className="contenedor-input-registro">
              <IconoUsuario />
              <input
                type="text"
                name="Apellido"
                placeholder="Tu apellido"
                className={`campo-input-registro ${errores.Apellido ? "campo-invalido-registro" : ""}`}
                value={formulario.Apellido}
                onChange={handleChange}
                required
              />
            </div>
            {errores.Apellido && <p className="mensaje-error-registro">{errores.Apellido}</p>}
          </div>
        </div>

        {/* Correo */}
        <div className="grupo-campo-registro">
          <label>Correo electrónico*</label>
          <div className="contenedor-input-registro">
            <IconoCorreo />
            <input
              type="email"
              name="Correo"
              placeholder="correo@correo.com"
              className={`campo-input-registro ${errores.Correo ? "campo-invalido-registro" : ""}`}
              value={formulario.Correo}
              onChange={handleChange}
              required
            />
          </div>
          {errores.Correo && <p className="mensaje-error-registro">{errores.Correo}</p>}
        </div>

        {/* Teléfono */}
        <div className="grupo-campo-registro">
          <label>Teléfono (opcional)</label>
          <div className="contenedor-input-registro">
            <IconoTelefono />
            <input
              type="tel"
              name="Telefono"
              placeholder="Número de teléfono"
              className="campo-input-registro"
              value={formulario.Telefono}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="grupo-campo-registro">
          <label>Contraseña*</label>
          <div className="contenedor-input-registro">
            <IconoClave />
            <input
              type="password"
              name="Contrasena"
              placeholder="••••••••"
              className={`campo-input-registro ${errores.Contrasena ? "campo-invalido-registro" : ""}`}
              value={formulario.Contrasena}
              onChange={handleChange}
              required
            />
          </div>
          {errores.Contrasena && <p className="mensaje-error-registro">{errores.Contrasena}</p>}
        </div>

        {/* Términos y condiciones */}
        <div className="contenedor-terminos-registro">
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={formulario.aceptaTerminos}
            onChange={handleChange}
            required
          />
          <label>Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a></label>
        </div>

        {/* Botón y mensaje */}
        <button type="submit" className="boton-registro" disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>

        {mensaje && (
          <p className={tipoMensaje === 'exito' ? 'mensaje-exito' : 'mensaje-error'}>
            {mensaje}
          </p>
        )}
      </form>

      <p className="textoRegistroUnico">
        ¿Ya tienes cuenta? <a href="/Cuenta" className="enlaceRegistroUnico">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Registro;
