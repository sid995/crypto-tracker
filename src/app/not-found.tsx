import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The resource you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
      </main>
    </div>
  );
} 