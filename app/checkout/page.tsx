"use client";

import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate sending order
    console.log("Order placed:", {
      name,
      address,
      cart,
    });

    clearCart();
    router.push("/checkout/success");
  };

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Items</h2>
            <ul className="space-y-2 border p-4 rounded bg-white">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg font-bold">Total: ${total.toFixed(2)}</p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border p-2 rounded"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border p-2 rounded"
              placeholder="123 Main Street, City"
            />
          </div>

          <div className="flex justify-between items-center gap-4">
            <Link
              href="/cart"
              className="border border-gray-400 px-6 py-2 rounded text-sm hover:bg-gray-100 transition"
            >
              ← Back to Cart
            </Link>

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Place Order
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
