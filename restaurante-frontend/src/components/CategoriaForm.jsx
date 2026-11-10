import { useState } from "react";

// R5: Componente de formulario controlado para categorías
function CategoriaForm({ onCrear }) {
  const [nombre, setNombre] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function manejarSubmit(evento) {
    evento.preventDefault(); // R11: Evita recarga de página
    setEnviando(true);

    const datosCategoria = {
      nombre: nombre.trim(),
    };

    // Avisamos a App.jsx. Devuelve true si se creó bien en SQLite
    const creada = await onCrear(datosCategoria);
    setEnviando(false);
    
    if (creada) {
      setNombre(""); // Limpieza solo en caso de éxito (Paso 11)
    }
  }

  return (
    // R22: Formulario semántico y accesible
    <form onSubmit={manejarSubmit} style={{ border: "2px dashed #999", padding: "15px", marginBottom: "20px", borderRadius: "8px", background: "#f9f9f9" }}>
      <h2>Nueva Categoría de Menú</h2>
      
      {/* R10: Entrada controlada */}
      <label style={{ display: "block", marginBottom: "15px" }}>
        Nombre de la Categoría
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          minLength={3}
          placeholder="Ej: Postres, Bebidas, Carnes..."
          style={{ display: "block", width: "100%", marginTop: "5px", padding: "5px" }}
        />
      </label>

      <button type="submit" disabled={enviando}>
        {enviando ? "Creando categoría..." : "Crear categoría"}
      </button>
    </form>
  );
}

export default CategoriaForm;
