function PlatoItem({ plato, onEditar, onEliminar }) {
  return (
    <article style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "5px", background: "#fff" }}>
      <h3>{plato.nombre}</h3>
      {plato.descripcion && <p>{plato.descripcion}</p>}
      <p><strong>Precio:</strong> {plato.precio}€</p>
      
      <p>Estado: <strong>{plato.disponible ? "Disponible en cocina" : "Agotado / No disponible"}</strong></p>
      
      <button onClick={() => onEditar(plato)}>
        {plato.disponible ? "Marcar como Agotado" : "Poner Disponible"}
      </button>
      
      <button onClick={() => onEliminar(plato.id)} style={{ marginLeft: "10px", color: "white" }}>
        Eliminar
      </button>
    </article>
  );
}

export default PlatoItem;
