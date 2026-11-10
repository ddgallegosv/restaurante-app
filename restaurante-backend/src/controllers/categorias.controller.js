import prisma from "../lib/prisma.js";

// Listar todas las categorías
export const obtenerCategorias = async (req, res, next) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

// Crear una categoría 
export const crearCategoria = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
    }
    const nuevaCategoria = await prisma.categoria.create({
      data: { nombre },
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    next(error);
  }
};

// Consultar los platos que pertenecen a una categoría específica
export const obtenerPlatosPorCategoria = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const categoria = await prisma.categoria.findUnique({
      where: { id },
      include: { platos: true },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    
    await prisma.categoria.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "No se puede eliminar una categoría con platos asociados." });
  }
};