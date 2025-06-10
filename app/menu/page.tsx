"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { menuItems } from "@/lib/menu";
import MenuItemCard from "@/components/MenuItemCard";

export default function MenuPage() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Our Menu</h1>
          <Link
            href="/cart"
            className="relative inline-flex items-center text-sm px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
          >
            🛒 Go to Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
