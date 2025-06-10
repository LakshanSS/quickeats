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
      id: '1',
      name: 'Cheeseburger',
      description: 'Juicy grilled beef patty with melted cheese.',
      price: 8.99,
      image: '/images/cheeseburger.jpg',
      tags: ['beef', 'grill', 'popular'],
    },
    {
      id: '2',
      name: 'Veggie Delight',
      description: 'A colorful mix of grilled vegetables in a bun.',
      price: 6.99,
      image: '/images/veggie.jpg',
      tags: ['vegetarian', 'light'],
    },
    {
      id: '3',
      name: 'Spicy Chicken Wrap',
      description: 'Grilled chicken with a spicy mayo kick.',
      price: 7.49,
      image: '/images/chicken-wrap.jpg',
      tags: ['chicken', 'spicy'],
    },
  ];
  