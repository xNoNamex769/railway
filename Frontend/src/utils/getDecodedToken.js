import { jwtDecode } from "jwt-decode"; // ✅ Correcto


export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwt_decode(token);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
