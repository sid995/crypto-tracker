import Header from '@/components/Header';
import CoinDetailContent from '@/components/CoinDetailContent';

export default async function CoinPage({ params }: { params: { id: string } }) {
  // const data = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets/${params.id}`, {
  //   headers: {
  //     'accept': 'application/json',
  //     'authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`
  //   }
  // });
  // const asset = await data.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coin/${params.id}`, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const { data } = await response.json();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <CoinDetailContent data={data} coinId={params.id} />
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>Data provided by CoinCap API</p>
        </div>
      </footer>
    </div>
  );
} 