import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Crypto<span className="text-blue-600 dark:text-blue-400">Tracker</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 