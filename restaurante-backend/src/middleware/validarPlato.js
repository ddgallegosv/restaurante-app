export const validarPlato = (req, res, next) => {
  const { nombre, precio, categoriaId } = req.body;

  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio y debe ser texto" });
  }

  if (precio === undefined || typeof precio !== "number" || precio <= 0) {
    return res.status(400).json({ error: "El campo 'precio' es obligatorio y debe ser un número mayor a 0" });
  }

  if (!categoriaId || typeof categoriaId !== "number") {
    return res.status(400).json({ error: "El campo 'categoriaId' es obligatorio y debe ser un número entero válido" });
  }

  next();
};
