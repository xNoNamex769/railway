export async function obtenerResumen(idResumen: number) {
  const res = await fetch(`http://localhost:3001/api/resumenia/resumen/${idResumen}`);
  const data = await res.json();
  return data;
}
