import { Router } from "express";
import {
  obtenerPlatos,
  obtenerPlatoPorId,
  crearPlato,
  actualizarPlato,
  eliminarPlato,
} from "../controllers/platos.controller.js";
import { verificarApiKey } from "../middleware/apiKey.js";
import { validarPlato } from "../middleware/validarPlato.js";

const router = Router();

router.get("/", obtenerPlatos);
router.get("/:id", obtenerPlatoPorId);
router.post("/", verificarApiKey, validarPlato, crearPlato);
router.patch("/:id", verificarApiKey, actualizarPlato);
router.delete("/:id", verificarApiKey, eliminarPlato);

export default router;