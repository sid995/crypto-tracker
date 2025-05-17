import Header from '@/components/Header';
import CoinDetailContent from '@/components/CoinDetailContent';
import { CryptoAsset } from '@/utilities/types';

export const revalidate = 5;

export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`);
  const { data: { data } } = await response.json();
  return data.map((asset: CryptoAsset) => ({ id: asset.id }));
}

export default async function CoinPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/coin/${id}/api`, {
    next: { revalidate }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const { data } = await response.json();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <CoinDetailContent data={data.data} />
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>Data provided by CoinCap API</p>
        </div>
      </footer>
    </div>
  );
} 