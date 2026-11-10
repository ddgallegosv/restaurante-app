import express from "express";
import dotenv from "dotenv";
import platosRoutes from "./routes/platos.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import cors from "cors"; //Importamos cors para el API:CORS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Añadimos las URL que usará la aplicación
app.use(
  cors({ origin: ["http://localhost:5173", "http://localhost:4173"] })
);
app.use(express.json());

// Ruta raíz de comprobación
app.get("/", (req, res) => {
  res.json({ mensaje: "API Restaurante operativa" });
});

// Rutas de los modelos
app.use("/api/platos", platosRoutes);
app.use("/api/categorias", categoriasRoutes);

// Manejo de ruta 404 (no encontrada)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo centralizado de errores 500
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;
