import { useCallback, useEffect, useState } from "react";
// Importamos todos los servicios necesarios de platos y categorías
import {
  obtenerPlatos,
  crearPlato,
  eliminarPlato,
  modificarPlato,
  obtenerCategorias,
  crearCategoria,
  eliminarCategoria,
} from "./services/restauranteApi";

// Importamos todos los componentes visuales
import PlatoItem from "./components/PlatoItem";
import PlatoForm from "./components/PlatoForm";
import CategoriaItem from "./components/CategoriaItem";
import CategoriaForm from "./components/CategoriaForm";

function App() {
  // --- ESTADOS DE PLATOS ---
  const [platos, setPlatos] = useState([]);

  // --- ESTADOS DE CATEGORÍAS ---
  const [categorias, setCategorias] = useState([]);

  // --- ESTADOS DE CONTROL DE CARGA GENERAL ---
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  // --- ESTADO PARA AVISOS DE ACCIONES (POST, DELETE) ---
  const [aviso, setAviso] = useState(null); // { tipo: "ok" | "error", texto }

  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
  }

  // Carga unificada de ambas colecciones utilizando Promise.all para optimizar el rendimiento
  const cargarDatosRestaurante = useCallback(async () => {
    try {
      setErrorCarga("");
      const [datosPlatos, datosCategorias] = await Promise.all([
        obtenerPlatos(),
        obtenerCategorias(),
      ]);
      setPlatos(datosPlatos);
      setCategorias(datosCategorias);
    } catch (err) {
      setErrorCarga(err.message);
    }
  }, []);

  useEffect(() => {
    cargarDatosRestaurante().finally(() => setCargando(false));
  }, [cargarDatosRestaurante]);

  function reintentar() {
    setCargando(true);
    cargarDatosRestaurante().finally(() => setCargando(false));
  }

  // ==========================================
  // MANEJADORES DE ACCIONES: PLATOS
  // ==========================================

  // R13: Crear Plato (POST)
  async function manejarCrearPlato(datos) {
    try {
      const nuevoPlato = await crearPlato(datos);
      setPlatos((actuales) => [...actuales, nuevoPlato]);
      mostrarAviso("ok", `Plato "${datos.nombre}" añadido correctamente`);
      return true;
    } catch (err) {
      mostrarAviso("error", err.message);
      return false;
    }
  }

  //EliminarPlato
  async function manejarEliminarPlato(id) {
    if (!window.confirm("¿Seguro que quieres eliminar este plato de la carta?"))
      return;

    try {
      await eliminarPlato(id);
      setPlatos((actuales) => actuales.filter((p) => p.id !== id));
      mostrarAviso("ok", "Plato eliminado correctamente de la carta");
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  //Editamos Plato (PATCH)
  async function manejarCambiarDisponibilidad(plato) {
    const cambios = { disponible: !plato.disponible };

    try {
      const actualizado = await modificarPlato(plato.id, cambios);

      setPlatos((actuales) =>
        actuales.map((p) =>
          p.id === plato.id ? { ...p, ...cambios, ...actualizado } : p,
        ),
      );
      mostrarAviso("ok", `Disponibilidad de "${plato.nombre}" actualizada`);
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  // ==========================================
  // MANEJADORES DE ACCIONES: CATEGORÍAS
  // ==========================================

  // Crear Categoría (POST)
  async function manejarCrearCategoria(datos) {
    try {
      const nuevaCategoria = await crearCategoria(datos);
      setCategorias((actuales) => [...actuales, nuevaCategoria]);
      mostrarAviso("ok", `Categoría "${datos.nombre}" creada correctamente`);
      return true;
    } catch (err) {
      mostrarAviso("error", err.message);
      return false;
    }
  }

  // Eliminar categorías con confirmación de usuario
  async function manejarEliminarCategoria(id) {
    if (
      !window.confirm(
        "¿Seguro que quieres eliminar esta categoría? Esto podría afectar a los platos asociados.",
      )
    )
      return;

    try {
      await eliminarCategoria(id);
      setCategorias((actuales) => actuales.filter((c) => c.id !== id));
      mostrarAviso("ok", "Categoría eliminada de la base de datos");
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  // Estado con inicializador perezoso para la API Key
  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem("apiKey") ?? "",
  );

  function guardarApiKey() {
    sessionStorage.setItem("apiKey", apiKey);
    mostrarAviso("ok", "Clave guardada durante la sesión");
  }

  return (
    <main>
      <h1>Gestión del Restaurante</h1>

      {/* Zona única de Avisos para Acciones */}
      {aviso && (
        <p className={`aviso aviso-${aviso.tipo}`} role="status">
          {aviso.texto}
        </p>
      )}

      {/* R9: Renderizado Condicional de los estados de carga global */}
      {cargando && <p>Cargando información del restaurante...</p>}

      {!cargando && errorCarga && (
        <div role="alert">
          <p>{errorCarga}</p>
          <button onClick={reintentar}>Reintentar carga</button>
        </div>
      )}

      {/* Interfaz principal dividida en dos columnas */}
      {!cargando && !errorCarga && (
        <div>
          <section
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "6px",
              background: "#f5f5f5",
            }}
          >
            <h2>Acceso a operaciones protegidas (Seguridad de la Carta)</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Introduce la API key (ej: clase-frameworks-2026)"
                style={{ padding: "5px", flex: 1 }}
              />
              <button onClick={guardarApiKey}>Guardar durante la sesión</button>
            </div>
          </section>

          {/* AQUÍ: añadimos className="admin-grid" */}
          <div className="admin-grid">
            {/* COLUMNA IZQUIERDA: GESTIÓN DE PLATOS */}
            <div>
              <PlatoForm onCrear={manejarCrearPlato} categorias={categorias} />
              <h2>Carta del Menú</h2>
              {platos.length === 0 && (
                <p>No hay platos en la carta actualmente.</p>
              )}
              {platos.map((plato) => (
                <PlatoItem
                  key={plato.id}
                  plato={plato}
                  onEditar={manejarCambiarDisponibilidad}
                  onEliminar={manejarEliminarPlato}
                />
              ))}
            </div>

            {/* COLUMNA DERECHA: GESTIÓN DE CATEGORÍAS */}
            <div>
              <CategoriaForm onCrear={manejarCrearCategoria} />
              <h3>Categorías existentes</h3>
              {categorias.length === 0 && <p>No hay categorías registradas.</p>}
              {categorias.map((categoria) => (
                <CategoriaItem
                  key={categoria.id}
                  categoria={categoria}
                  onEliminar={manejarEliminarCategoria}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
