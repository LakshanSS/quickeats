"use client";

import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import Link from "next/link";
import { menuItems } from "@/lib/menu";
import ChatAssistant from "@/components/ChatAssistant";
import MenuItemCard from "@/components/MenuItemCard";

export default function MenuPage() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [recommendation, setRecommendation] = useState<string>(
    "How about trying the Peri-Peri Grilled Chicken for more spice, or cool off with a refreshing Iced Lemon Tea? Both would go great with your favorites!"
  );

  useEffect(() => {
    const stored = localStorage.getItem("lastOrder");
    if (stored) {
      const parsed = JSON.parse(stored);
      fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastOrder: parsed.cart }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.summary) setRecommendation(data.summary);
        })
        .catch(() => setRecommendation(""));
    }
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
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

          {recommendation && (
            <div className="mb-8 px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm text-gray-800">
              <span className="font-semibold text-base text-blue-800">
                Recommended:
              </span>{" "}
              <span className="text-base">{recommendation}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>

      <ChatAssistant />
    </>
  );
}
