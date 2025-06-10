import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed!</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Thank you for ordering with QuickEats. Your delicious food is on its way!
      </p>
      <Link
        href="/menu"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Back to Menu
      </Link>
    </main>
  );
}
