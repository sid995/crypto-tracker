'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedAsset } from '@/store/features/cryptoSlice';
import { CryptoAsset } from '@/libs/types';
import PriceTicker from '@/components/PriceTicker';
import MarketInfo from './MarketInfo';
import Image from 'next/image';

interface CoinDetailContentProps {
  data: CryptoAsset;
}

export default function CoinDetailContent({ data: initialData }: CoinDetailContentProps) {
  const dispatch = useAppDispatch();
  const { selectedAsset: coin, error } = useAppSelector((state) => state.crypto);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (initialData && initialData?.id) {
      dispatch(setSelectedAsset(initialData));
    }
  }, [initialData, dispatch]);

  useEffect(() => {
    dispatch(setSelectedAsset(initialData));

    const fetchData = async () => {
      try {
        const response = await fetch(`/coin/${initialData.id}/api`);
        const result = await response.json();
        dispatch(setSelectedAsset(result.data.data));
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [initialData, dispatch]);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!coin) {
    return <div className="text-red-500 p-4">Asset not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">

          {!imageError ? (
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
              <Image
                src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                alt={coin.symbol}
                className="rounded-full"
                width={32}
                height={32}
                onError={() => setImageError(true)}
              />
            </div>
          ) : null}
          <h1 className="text-3xl font-bold">{coin.name}</h1>
          <span className="text-gray-500 dark:text-gray-400">{coin.symbol}</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Back to List
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PriceTicker />
        </div>

        <div>
          <MarketInfo />
        </div>
      </div>

      {coin.explorer && (
        <div className="mt-6 text-center">
          <a
            href={coin.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View on Blockchain Explorer →
          </a>
        </div>
      )}
    </div>
  );
} 