"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CartItem } from "@/lib/cart-context";

type Order = {
  name: string;
  address: string;
  cart: CartItem[];
  total: number;
};

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lastOrder");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Order Placed!
      </h1>
      <p className="text-gray-700 mb-6 max-w-md">
        Thank you for ordering with{" "}
        <span className="font-semibold">QuickEats</span>. Your food is on its
        way!
      </p>

      {order && (
        <div className="mb-6 w-full max-w-md text-left border p-4 rounded bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Your Order</h2>
          <ul className="text-sm mb-2">
            {order.cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Link
          href="/menu"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Order More
        </Link>
        <Link
          href="/"
          className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
