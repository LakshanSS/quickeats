"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="mb-4">Your cart is empty.</p>
          <Link
            href="/menu"
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            ← Go to Menu
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t pt-4 flex justify-between items-center">
            <Link
              href="/menu"
              className="border border-gray-400 px-6 py-2 rounded text-sm hover:bg-gray-100 transition"
            >
              ← Continue Ordering
            </Link>

            <div className="flex items-center gap-4">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <Link
                href="/checkout"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
