'use client';

import Link from 'next/link';
import { CryptoAsset } from '@/utilities/types';
import { formatPrice, formatPercentage } from '@/utilities/utils';

interface CryptoCardProps {
  asset: CryptoAsset;
}

export default function CryptoCard({ asset }: CryptoCardProps) {
  const isPositive = parseFloat(asset.changePercent24Hr) >= 0;

  return (
    <Link
      href={`/coin/${asset.id}`}
      className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
            <span className="font-semibold">{asset.symbol}</span>
          </div>
          <div>
            <h3 className="font-medium">{asset.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{asset.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formatPrice(asset.priceUsd)}</p>
          <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(asset.changePercent24Hr)}
          </p>
        </div>
      </div>
    </Link>
  );
} 