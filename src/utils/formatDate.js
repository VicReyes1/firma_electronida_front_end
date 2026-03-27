/* ============================================================================
 *  UTILIDAD: formatDate.js
 *  Objetivo:
 *    - Normalizar fechas ISO del backend
 *    - Mostrar en formato legible para tablas
 *    - Evitar "Invalid Date" y valores vacíos
 * ========================================================================== */

export function formatTableDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
