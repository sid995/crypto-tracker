import Header from '@/components/Header';
import CoinDetailContent from '@/components/CoinDetailContent';
import { CryptoAsset } from '@/libs/types';
import { getBaseUrl } from '@/libs/getBaseUrl';

export const revalidate = 5;

export const dynamicParams = true;

export async function generateStaticParams() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api`);
  const { data: { data } } = await response.json();
  return data.map((asset: CryptoAsset) => ({ id: asset.id }));
}

export default async function CoinPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/coin/${id}/api`, {
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