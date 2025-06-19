import React, { useEffect, useState } from "react";
import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
} from "html5-qrcode";
import axios from "axios";

export default function EscanerHtml5QR() {
  const [loading, setLoading] = useState(false);

 
useEffect(() => {
  const scanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: 300,
    rememberLastUsedCamera: true,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  });

  let hasScanned = false;

  scanner.render(
    async (decodedText) => {
      if (hasScanned) return;
      hasScanned = true;
      setLoading(true);

      try {
        console.log("✅ QR detectado:", decodedText);
        const base64 = decodedText.split("activsenaqr://")[1];
        if (!base64) throw new Error("Formato de QR inválido.");

        const parsed = JSON.parse(atob(base64));
        const IdUsuario = parseInt(localStorage.getItem("IdUsuario"));
        const token = localStorage.getItem("token");

        if (!IdUsuario || !token) {
          alert("⚠️ Usuario o sesión no válidos. Vuelve a iniciar sesión.");
          return;
        }

        const payload = { ...parsed, IdUsuario };

        const response = await axios.post(
          "http://localhost:3001/api/asistencia/qr",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert(response?.data?.mensaje ?? "✅ Asistencia registrada.");
      } catch (error) {
        console.error("❌ Error:", error);
        hasScanned = false;
        alert(
          error.response?.data?.error ||
          error.message ||
          "Error al registrar asistencia."
        );
      } finally {
        setLoading(false);
        // 🔥 Ya no se llama scanner.clear() aquí
      }
    },
    (error) => {
      if (Math.random() < 0.1) {
        console.warn("❌ No se pudo leer el QR:", error);
      }
    }
  );

  return () => {
    // Limpiamos el scanner solo cuando el componente se desmonta
    scanner.clear().catch((e) =>
      console.error("Error al desmontar scanner", e)
    );
  };
}, []);

  return (
    <div>
      <h2>📷 Escanear QR (html5-qrcode)</h2>
      {loading && <p>⏳ Enviando asistencia...</p>}
     <div id="reader" style={{ width: "500px" }}></div>

    </div>
  );
}
