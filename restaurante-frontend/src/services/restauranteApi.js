const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const BASE_URL = `${API_BASE}/api`; 

const API_KEY = "clase-frameworks-2026"; 

function obtenerApiKey() {
  return sessionStorage.getItem("apiKey") ?? "";
}

// R17: Tratamiento de fallos centralizado para todas las peticiones
async function peticion(url, opciones, mensajeError) {
  let respuesta;
  try {
    respuesta = await fetch(url, opciones);
  } catch {
    throw new Error(
      "No se puede conectar con el servidor. ¿Está arrancado el Backend?"
    );
  }
  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}));
    throw new Error(
      cuerpo.error ?? `${mensajeError} (código ${respuesta.status})`
    );
  }
  const texto = await respuesta.text();
  return texto ? JSON.parse(texto) : null;
}


function cabecerasProtegidas() {
  return { "Content-Type": "application/json", "x-api-key": obtenerApiKey() };
}

/* ==========================================================================
   ENTIDAD: PLATOS / MENÚ (CRUD COMPLETO)
   ========================================================================== */

// R12: GET - Obtener todos los platos del restaurante
export function obtenerPlatos() {
  return peticion(`${BASE_URL}/platos`, undefined, "No se pudo cargar la carta del restaurante");
}

// R13: POST - Crear un nuevo plato desde el formulario controlado
export function crearPlato(datosPlato) {
  return peticion(
    `${BASE_URL}/platos`,
    {
      method: "POST",
      headers: cabecerasProtegidas(),
      body: JSON.stringify(datosPlato),
    },
    "No se pudo añadir el plato a la carta"
  );
}

export function modificarPlato(id, cambios) {
  return peticion(
    `${BASE_URL}/platos/${id}`,
    {
      method: "PATCH",
      headers: cabecerasProtegidas(),
      body: JSON.stringify(cambios),
    },
    "No se pudo actualizar el plato"
  );
}

// R15: DELETE - Eliminar un plato de la carta físicamente en SQLite
export function eliminarPlato(id) {
  return peticion(
    `${BASE_URL}/platos/${id}`,
    { method: "DELETE", headers: { "x-api-key": obtenerApiKey() } },
    "No se pudo eliminar el plato"
  );
}

/* ==========================================================================
   ENTIDAD: CATEGORÍAS (CRUD COMPLETO)
   ========================================================================== */

// GET - Obtener todas las categorías para listarlas y usarlas en los desplegables
export function obtenerCategorias() {
  return peticion(`${BASE_URL}/categorias`, undefined, "No se pudieron cargar las categorías");
}

// POST - Crear una nueva categoría desde CategoriaForm
export function crearCategoria(datosCategoria) {
  return peticion(
    `${BASE_URL}/categorias`,
    {
      method: "POST",
      headers: cabecerasProtegidas(),
      body: JSON.stringify(datosCategoria),
    },
    "No se pudo crear la categoría"
  );
}

// DELETE - Eliminar una categoría de la base de datos
export function eliminarCategoria(id) {
  return peticion(
    `${BASE_URL}/categorias/${id}`,
    { method: "DELETE", headers: { "x-api-key": obtenerApiKey() } },
    "No se pudo eliminar la categoría"
  );
}