import prisma from "../lib/prisma.js";

// Listar platos 
export const obtenerPlatos = async (req, res, next) => {
  try {
    const { disponible } = req.query;
    const where = {};

    if (disponible !== undefined) {
      where.disponible = disponible === "true";
    }

    const platos = await prisma.plato.findMany({
      where,
      include: { categoria: true }, // Incluye datos de la categoría relacionada
    });

    res.json(platos);
  } catch (error) {
    next(error);
  }
};

// Obtener un solo plato por ID
export const obtenerPlatoPorId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const plato = await prisma.plato.findUnique({
      where: { id },
      include: { categoria: true },
    });

    if (!plato) {
      return res.status(404).json({ error: "Plato no encontrado" });
    }

    res.json(plato);
  } catch (error) {
    next(error);
  }
};

// Crear plato
export const crearPlato = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, disponible, categoriaId } = req.body;

    const nuevoPlato = await prisma.plato.create({
      data: {
        nombre,
        descripcion,
        precio,
        disponible: disponible !== undefined ? disponible : true,
        categoriaId,
      },
      include: { categoria: true },
    });

    res.status(201).json(nuevoPlato);
  } catch (error) {
    next(error);
  }
};

// Modificar plato (PATCH)
export const actualizarPlato = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, precio, disponible, categoriaId } = req.body;

    // Verificar si existe antes
    const platoExiste = await prisma.plato.findUnique({ where: { id } });
    if (!platoExiste) {
      return res.status(404).json({ error: "Plato no encontrado" });
    }

    const platoActualizado = await prisma.plato.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(descripcion !== undefined && { descripcion }),
        ...(precio !== undefined && { precio }),
        ...(disponible !== undefined && { disponible }),
        ...(categoriaId && { categoriaId }),
      },
    });

    res.json(platoActualizado);
  } catch (error) {
    next(error);
  }
};

// Eliminar plato (DELETE)
export const eliminarPlato = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const platoExiste = await prisma.plato.findUnique({ where: { id } });
    if (!platoExiste) {
      return res.status(404).json({ error: "Plato no encontrado" });
    }

    await prisma.plato.delete({ where: { id } });

    res.status(204).send(); // 204 No Content
  } catch (error) {
    next(error);
  }
};