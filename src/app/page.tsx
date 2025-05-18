import Header from '@/components/Header';
import CryptoList from '@/components/CryptoList';
import { getBaseUrl } from '@/libs/getBaseUrl';

export const revalidate = 0;

export default async function HomePage() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const { data: { data } } = await response.json();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Top Cryptocurrencies</h1>
        <CryptoList initialData={data || []} />
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>Data provided by CoinCap API</p>
        </div>
      </footer>
    </div>
  );
}