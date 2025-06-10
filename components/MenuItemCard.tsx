'use client';

import { MenuItem } from '@/lib/menu';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(item);
    router.push('/cart'); // Navigate to cart after adding
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white w-[400px] min-h-[600px] flex flex-col">
      <div className="w-full h-[400px] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-t-xl transition-transform duration-200 hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-md font-bold text-gray-800 mt-2">
            ${item.price.toFixed(2)}
          </p>
        </div>
        <button
          className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
