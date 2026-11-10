// R5: Componente funcional puro que recibe datos por Props
function CategoriaItem({ categoria, onEliminar }) {
  return (
    // R22: HTML Semántico (<article>)
    <article style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ddd", padding: "10px", marginBottom: "5px", borderRadius: "4px", background: "#fff" }}>
      <span><strong>{categoria.nombre}</strong></span>
      
      {/* R11: Función flecha para evitar la ejecución automática al pintar */}
      <button 
        onClick={() => onEliminar(categoria.id)} 
        style={{ color: "white", padding: "3px 8px", fontSize: "0.85rem" }}
      >
        Eliminar
      </button>
    </article>
  );
}

export default CategoriaItem;
