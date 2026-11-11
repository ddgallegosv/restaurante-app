import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  // 1. Crear categoría inicial
  const categoria = await prisma.categoria.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nombre: "Entrantes",
    },
  });

  // 2. Crear plato inicial vinculado a la categoría
  await prisma.plato.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nombre: "Ensalada Mediterránea",
      precio: 8.5,
      calorias: 250,
      disponible: true,
      categoriaId: categoria.id,
    },
  });

  console.log("Semilla ejecutada con éxito");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });