import { Router } from "express";
import {
  obtenerCategorias,
  crearCategoria,
  obtenerPlatosPorCategoria,
  eliminarCategoria
} from "../controllers/categorias.controller.js";
import { verificarApiKey } from "../middleware/apiKey.js";

const router = Router();

router.get("/", obtenerCategorias);
router.get("/:id/platos", obtenerPlatosPorCategoria); 
router.post("/", verificarApiKey, crearCategoria);
router.delete("/:id", verificarApiKey, eliminarCategoria);

export default router;