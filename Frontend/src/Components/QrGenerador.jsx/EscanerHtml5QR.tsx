import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style/Escaner.css"

const QRScannerHtml5 = () => {
  const qrCodeRegionId = 'reader';
  const [mensaje, setMensaje] = useState('');
  const [color, setColor] = useState('text-black');
  const [exito, setExito] = useState(false);
  const [escaneando, setEscaneando] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const navigate = useNavigate();

  const procesarQR = async (textoQR: string) => {
    console.log(" Contenido decodificado del QR:", textoQR);

    try {
      const payloadBruto = JSON.parse(textoQR);
      const payload = {
        ...payloadBruto,
        IdActividad: payloadBruto.IdActividad || payloadBruto.idActividad,
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.10.111:3001/api/asistencia/qr',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje(response.data.mensaje);
      setColor('text-green-600');
      setExito(true);
      setEscaneando(false);

      setTimeout(() => {
        navigate('/historial');
      }, 3000);

    } catch (error: any) {
      console.error("❌ Error procesando el QR:", error);
      const msg = error.response?.data?.error || 'Error al procesar QR';
      setMensaje(`❌ ${msg}`);
      setColor('text-red-600');
      setEscaneando(false);
    }
  };

  const iniciarEscaneo = () => {
    if (escaneando) return;

    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    scannerRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          html5QrCode.stop().then(() => html5QrCode.clear());
          procesarQR(decodedText);
        },
        () => {}
      )
      .then(() => setEscaneando(true))
      .catch((err) => {
        console.error("Error al iniciar cámara:", err);
        setMensaje('Error al iniciar cámara');
        setColor('text-red-600');
      });
  };

  useEffect(() => {
    return () => {
      const scanner = scannerRef.current;
      if (scanner && scanner.getState() === 2) {
        scanner.stop().then(() => scanner.clear()).catch(console.error);
      }
    };
  }, []);

  return (
    <div className="qr-container">
      <h2 className="qr-title">Escanea tu asistencia</h2>

      {!escaneando && !exito && (
        <button onClick={iniciarEscaneo} className="qr-btn">
          📷 Abrir Cámara
        </button>
      )}

      {!exito && <div id={qrCodeRegionId} className="qr-reader" />}

      {exito && (
        <div className="qr-success">
          <div className="qr-check">✅</div>
          <p className="qr-success-text">¡Asistencia completada!</p>
        </div>
      )}

      <p className={`qr-message ${color}`}>{mensaje}</p>
    </div>
  );
};

export default QRScannerHtml5;
