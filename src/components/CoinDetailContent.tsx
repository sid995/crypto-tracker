'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/Store/hooks';
import { fetchAssetById, updateAssetPrice } from '@/Store/features/cryptoSlice';
import { CryptoAsset } from '@/utilities/types';
import PriceTicker from '@/components/PriceTicker';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatLargeNumber, formatPercentage } from '@/utilities/utils';

interface CoinDetailContentProps {
  coinId: string;
  data: CryptoAsset;
}

export default function CoinDetailContent({ coinId, data }: CoinDetailContentProps) {
  console.log("Coin Detail Content", data);
  const dispatch = useAppDispatch();
  const { selectedAsset: coin, loading, error } = useAppSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchAssetById(coinId));
  }, [coinId, dispatch]);

  const handlePriceUpdate = (updatedAsset: CryptoAsset) => {
    dispatch(updateAssetPrice(updatedAsset));
  };

  if (loading && !coin) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!coin) {
    return <div className="text-red-500 p-4">Asset not found</div>;
  }

  const isPositive = parseFloat(coin.changePercent24Hr) >= 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
            <span className="font-bold text-lg">{coin.symbol}</span>
          </div>
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
          <PriceTicker asset={coin} onUpdate={handlePriceUpdate} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Market Stats</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
              <span className="font-medium">${formatLargeNumber(coin.marketCapUsd)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">24h Volume</span>
              <span className="font-medium">${formatLargeNumber(coin.volumeUsd24Hr)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">24h Change</span>
              <span className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(coin.changePercent24Hr)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Supply</span>
              <span className="font-medium">{formatLargeNumber(coin.supply)} {coin.symbol}</span>
            </div>

            {coin.maxSupply && (
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Max Supply</span>
                <span className="font-medium">{formatLargeNumber(coin.maxSupply)} {coin.symbol}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Rank</span>
              <span className="font-medium">#{coin.rank}</span>
            </div>
          </div>
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