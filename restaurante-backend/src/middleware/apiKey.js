import "dotenv/config";

export const verificarApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const claveValida = process.env.API_KEY;

  if (!apiKey || apiKey !== claveValida) {
    return res.status(401).json({
      error: "No autorizado: API Key no proporcionada o no válida",
    });
  }

  next();
};
