import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Welcome to <span className="text-orange-500">QuickEats</span> 🍔
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Your go-to app for quick, delicious meals — now enhanced with
          AI-powered food recommendation, chat assistant, smart order summary
          and more.
        </p>
        <Link
          href="/menu"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
        >
          View Menu
        </Link>
      </div>
    </main>
  );
}
