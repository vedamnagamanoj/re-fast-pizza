import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional — remove this if you don’t want it)
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.item.deleteMany();

  console.log("🗑️ Cleared existing data");

  // Seed items
  const items = [
    {
      name: "Greek",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-13.jpg",
      ingredients: [
        "tomato",
        "mozzarella",
        "spinach",
        "feta",
        "olives",
        "pepperoncini",
      ],
      soldOut: true,
    },
    {
      name: "Siciliana",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-8.jpg",
      ingredients: ["tomato", "mozzarella", "anchovies", "olives", "capers"],
      soldOut: true,
    },
    {
      name: "Diavola",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-5.jpg",
      ingredients: ["tomato", "mozzarella", "spicy salami", "chili flakes"],
      soldOut: false,
    },
    {
      name: "Vegetale",
      unitPrice: 13,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-6.jpg",
      ingredients: [
        "tomato",
        "mozzarella",
        "bell peppers",
        "onions",
        "mushrooms",
      ],
      soldOut: false,
    },
    {
      name: "Napoli",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-7.jpg",
      ingredients: ["tomato", "mozzarella", "fresh tomato", "basil"],
      soldOut: false,
    },
    {
      name: "Margherita",
      unitPrice: 12,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
      ingredients: ["tomato", "mozzarella", "basil"],
      soldOut: false,
    },
    {
      name: "Romana",
      unitPrice: 15,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-3.jpg",
      ingredients: ["tomato", "mozzarella", "prosciutto"],
      soldOut: false,
    },
    {
      name: "Eggplant Parmesan",
      unitPrice: 15,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-16.jpg",
      ingredients: ["marinara", "mozzarella", "eggplant", "parmesan"],
      soldOut: false,
    },
    {
      name: "Abruzzese",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-14.jpg",
      ingredients: ["tomato", "mozzarella", "prosciutto", "arugula"],
      soldOut: false,
    },
    {
      name: "Tofu and Mushroom",
      unitPrice: 15,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-18.jpg",
      ingredients: [
        "marinara",
        "mozzarella",
        "tofu",
        "mushrooms",
        "bell peppers",
      ],
      soldOut: false,
    },
    {
      name: "Prosciutto e Rucola",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-4.jpg",
      ingredients: ["tomato", "mozzarella", "prosciutto", "arugula"],
      soldOut: false,
    },
    {
      name: "Hawaiian",
      unitPrice: 15,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-10.jpg",
      ingredients: ["tomato", "mozzarella", "pineapple", "ham"],
      soldOut: false,
    },
    {
      name: "Capricciosa",
      unitPrice: 14,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-2.jpg",
      ingredients: ["tomato", "mozzarella", "ham", "mushrooms", "artichoke"],
      soldOut: true,
    },
    {
      name: "Spinach and Mushroom",
      unitPrice: 15,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-11.jpg",
      ingredients: ["tomato", "mozzarella", "spinach", "mushrooms"],
      soldOut: false,
    },
    {
      name: "Roasted Veggie",
      unitPrice: 15,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-17.jpg",
      ingredients: [
        "marinara",
        "mozzarella",
        "zucchini",
        "eggplant",
        "peppers",
        "onions",
      ],
      soldOut: false,
    },
    {
      name: "Pepperoni",
      unitPrice: 14,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-9.jpg",
      ingredients: ["tomato", "mozzarella", "pepperoni"],
      soldOut: false,
    },
    {
      name: "Mediterranean",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-12.jpg",
      ingredients: [
        "tomato",
        "mozzarella",
        "sun-dried tomatoes",
        "olives",
        "artichoke",
      ],
      soldOut: false,
    },
    {
      name: "Pesto Chicken",
      unitPrice: 16,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-15.jpg",
      ingredients: [
        "pesto",
        "mozzarella",
        "chicken",
        "sun-dried tomatoes",
        "spinach",
      ],
      soldOut: false,
    },
  ];

  await prisma.item.createMany({ data: items });

  console.log("🌱 Seeded items successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
