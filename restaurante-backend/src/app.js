import express from "express";
import dotenv from "dotenv";
import platosRoutes from "./routes/platos.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import cors from "cors";

dotenv.config();

const PRODUCCION = process.env.NODE_ENV === "production";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const origenes = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:4173"];

app.use(cors({ origin: origenes }));
app.use(express.json());

// Ruta de salud: sirve para comprobar que el servicio está vivo
app.get("/", (req, res) => {
  res.json({ estado: "ok", servicio: "api-restaurante" });
});

// Rutas de los modelos
app.use("/api/platos", platosRoutes);
app.use("/api/categorias", categoriasRoutes);

// Manejo de ruta 404 (no encontrada)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador de errores global: el detalle va a los LOGS, no al usuario
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: PRODUCCION ? "Error interno del servidor" : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;