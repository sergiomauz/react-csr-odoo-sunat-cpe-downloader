export function cpeQueryValidator(req, res, next) {
  const { ruc, serie, correlativo, fecha, token } = req.body;

  const errores = [];

  if (!/^\d{11}$/.test(ruc))
    errores.push("ID debe tener exactamente 11 caracteres numéricos.");

  if (!/^[A-Za-z0-9]{4}$/.test(serie))
    errores.push("Serie debe tener exactamente 4 caracteres alfanuméricos.");

  if (!/^\d{1,8}$/.test(correlativo))
    errores.push("Correlativo debe tener hasta 8 caracteres numéricos.");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha))
    errores.push("Fecha debe tener formato yyyy-MM-dd.");

  if (typeof token !== "string" || token.length > 15)
    errores.push("Token debe tener hasta 15 caracteres.");

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
}
