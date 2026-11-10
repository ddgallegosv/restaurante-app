import { useState } from "react";

// R5: Recibe ahora la lista de categorías mediante props para el desplegable
function PlatoForm({ onCrear, categorias }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState(""); // Estado para guardar la categoría elegida
  const [enviando, setEnviando] = useState(false);

  async function manejarSubmit(evento) {
    evento.preventDefault();
    
    // Si no ha elegido ninguna categoría válida, cancelamos el envío
    if (!categoriaId) {
      alert("Por favor, selecciona una categoría para el plato.");
      return;
    }

    setEnviando(true);

    // R10/R21: Conversión explícita del precio a decimal y de categoriaId a entero para Prisma
    const datosPlato = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: Number(precio),
      categoriaId: parseInt(categoriaId, 10), // Convertimos la categoría a un número entero
    };

    const creado = await onCrear(datosPlato);
    setEnviando(false);
    
    if (creada) {
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCategoriaId(""); // Reiniciamos el selector
    }
  }

  return (
    <form onSubmit={manejarSubmit} style={{ border: "2px dashed #bbb", padding: "20px", marginBottom: "20px", borderRadius: "8px" }}>
      <h2>Añadir Nuevo Plato</h2>
      
      <label style={{ display: "block", marginBottom: "10px" }}>
        Nombre del Plato
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          minLength={3}
          style={{ display: "block", width: "100%", marginTop: "5px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Descripción (Ingredientes / Alérgenos)
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "5px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Precio (€)
        <input
          type="number"
          step="0.01"
          min="0"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginTop: "5px" }}
        />
      </label>

      {/* R10: Nuevo selector controlado para asignar la categoría obligatoria */}
      <label style={{ display: "block", marginBottom: "15px" }}>
        Categoría del Plato
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginTop: "5px", padding: "5px" }}
        >
          <option value="">-- Selecciona una categoría --</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={enviando}>
        {enviando ? "Añadiendo a la carta..." : "Crear plato"}
      </button>
    </form>
  );
}

export default PlatoForm;
