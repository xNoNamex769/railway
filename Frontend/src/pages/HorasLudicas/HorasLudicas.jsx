import React from 'react';
import './style/HorasLudicas.css';

const actividades = [
  { horas: 5, fecha: '2024-08-01', actividad: 'Baloncesto' },
  { horas: 3, fecha: '2024-08-10', actividad: 'Fútbol' },
  { horas: 4, fecha: '2024-08-15', actividad: 'Voleibol' }
];

const totalHoras = actividades.reduce((sum, act) => sum + act.horas, 0);
const objetivo = 80;
const progreso = Math.min((totalHoras / objetivo) * 100, 100);

const HorasLudicas = () => {
  const objetivoAlcanzado = totalHoras >= objetivo;

  return (
    <section className="horas-ludicas-container">
      <header className="horas-ludicas-header">
        <h2>Horas Lúdicas Realizadas</h2>
      </header>

      <div className="horas-ludicas-content">

        <article className="horas-ludicas-activities">
          <h3>Actividades realizadas</h3>
          <ul>
            {actividades.map(({ actividad, horas, fecha }, idx) => (
              <li key={idx} className="actividad-item">
                <span className="actividad-nombre">{actividad}</span>
                <span className="actividad-horas">{horas} horas</span>
                <span className="actividad-fecha">{fecha}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="horas-ludicas-summary">
          <h3>Resumen</h3>
          <p><strong>{totalHoras}</strong> horas acumuladas</p>

          {objetivoAlcanzado ? (
            <p className="mensaje-exito">¡Felicidades! Has alcanzado el objetivo de <strong>{objetivo}</strong> horas.</p>
          ) : (
            <p>Te faltan <strong>{objetivo - totalHoras}</strong> horas para llegar a <strong>{objetivo}</strong></p>
          )}

          {objetivoAlcanzado ? (
            <button className="btn-certificado">Descargar Certificado</button>
          ) : (
            <button className="btn-certificado btn-disabled" disabled>
              Descarga disponible al alcanzar el objetivo
            </button>
          )}

          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={totalHoras}
            aria-valuemin="0"
            aria-valuemax={objetivo}
            aria-label="Barra de progreso de horas lúdicas"
          >
            <div className="progress-fill" style={{ width: `${progreso}%` }}>
              {Math.round(progreso)}%
            </div>
          </div>
        </aside>

      </div>

      <section className="horas-ludicas-info">
        <h3>¿Qué son las horas lúdicas?</h3>
        <p>Son actividades recreativas y educativas que ayudan a tu desarrollo personal y social. Participar en talleres, clases y eventos organizados cuenta como horas lúdicas.</p>
        <p>Mejoran tus habilidades, conocimientos y bienestar general.</p>
      </section>
    </section>
  );
};

export default HorasLudicas;
