import Header from '@/components/Header';
import CryptoList from '@/components/CryptoList';

export const revalidate = 0;

export default async function HomePage() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const { data: { data } } = await response.json();

    if (!data) {
      throw new Error('No data received from API');
    }

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
  } catch (error) {
    console.error('Home page error:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-red-500">
            Error loading cryptocurrency data. Please try again later.
          </div>
        </main>
      </div>
    );
  }
}