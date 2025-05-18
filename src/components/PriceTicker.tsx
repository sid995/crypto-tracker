'use client';

import { useEffect, useRef, useState } from 'react';
import { formatPrice, formatPercentage } from '@/utilities/utils';
import { useAppSelector } from '@/store/hooks';


export default function PriceTicker() {
  const coin = useAppSelector((state) => state.crypto.selectedAsset);

  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);
  const previousPriceRef = useRef(coin?.priceUsd || '0');

  useEffect(() => {
    if (!coin) return;

    const currentPrice = coin.priceUsd;
    const previousPrice = previousPriceRef.current;

    if (parseFloat(currentPrice) > parseFloat(previousPrice)) {
      setPriceDirection('up');
    } else if (parseFloat(currentPrice) < parseFloat(previousPrice)) {
      setPriceDirection('down');
    }

    previousPriceRef.current = currentPrice;

    const timer = setTimeout(() => {
      setPriceDirection(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [coin?.priceUsd, coin]);

  if (!coin) {
    return (
      <div className="flex flex-col items-center space-y-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
        <div className="h-7 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    );
  }

  const isPositive = parseFloat(coin.changePercent24Hr) >= 0;

  return (
    <div className="flex flex-col items-center space-y-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-xl font-semibold">{coin.name} ({coin.symbol})</h3>
      <div
        className={`text-3xl font-bold transition-colors duration-500 ${priceDirection === 'up'
          ? 'text-green-500'
          : priceDirection === 'down'
            ? 'text-red-500'
            : ''
          }`}
      >
        {formatPrice(coin.priceUsd)}
      </div>
      <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {formatPercentage(coin.changePercent24Hr)} (24h)
      </div>
    </div>
  );
} 