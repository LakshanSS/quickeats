export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
};

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Cheeseburger",
    description: "Juicy grilled beef patty with melted cheese.",
    price: 8.99,
    image: "/images/cheeseburger.jpg",
    tags: ["beef", "grill", "popular"],
  },
  {
    id: "2",
    name: "Spicy Chicken Wrap",
    description: "Grilled chicken with a spicy mayo kick.",
    price: 7.49,
    image: "/images/chicken-wrap.jpg",
    tags: ["chicken", "spicy"],
  },

  {
    id: "3",
    name: "Veggie Delight",
    description: "A colorful mix of grilled vegetables in a bun.",
    price: 6.99,
    image: "/images/veggie.jpg",
    tags: ["vegetarian", "light"],
  },

  {
    id: "4",
    name: "Peri-Peri Grilled Chicken",
    description: "Flame-grilled chicken marinated in spicy peri-peri sauce.",
    price: 9.49,
    image: "/images/peri-peri.jpg",
    tags: ["grill", "spicy", "chicken"],
  },
  {
    id: "5",
    name: "Quinoa Power Bowl",
    description: "Protein-packed bowl with quinoa, chickpeas, and greens.",
    price: 9.99,
    image: "/images/quinoa-bowl.jpg",
    tags: ["healthy", "vegetarian", "gluten-free"],
  },
  {
    id: "6",
    name: "Classic Fries",
    description: "Crispy golden fries, lightly salted.",
    price: 3.49,
    image: "/images/fries.jpg",
    tags: ["side", "snack", "popular"],
  },
  {
    id: "7",
    name: "Sweet Potato Wedges",
    description: "Baked wedges with a hint of cinnamon and spice.",
    price: 3.99,
    image: "/images/sweet-potato.jpg",
    tags: ["side", "sweet", "vegetarian"],
  },
  {
    id: "8",
    name: "Iced Lemon Tea",
    description: "Chilled lemon tea brewed fresh daily.",
    price: 2.49,
    image: "/images/lemon-tea.jpg",
    tags: ["drink", "refreshing"],
  },
  {
    id: "9",
    name: "Mango Smoothie",
    description: "Creamy mango blend with real fruit and yogurt.",
    price: 4.99,
    image: "/images/mango-smoothie.jpg",
    tags: ["drink", "fruit", "popular"],
  },
];
