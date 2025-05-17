'use client';

import { useEffect, useState } from 'react';
import { CryptoAsset } from '@/utilities/types';
import { formatPrice, formatPercentage } from '@/utilities/utils';

interface PriceTickerProps {
  asset: CryptoAsset;
  onUpdate?: (updatedAsset: CryptoAsset) => void;
}

export default function PriceTicker({ asset, onUpdate }: PriceTickerProps) {
  const [currentPrice, setCurrentPrice] = useState(asset.priceUsd);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const fetchLatestPrice = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets/${asset.id}`);
        const data = await response.json();
        const updatedAsset = data.data;

        // Update price direction for animation
        const oldPrice = currentPrice;
        setCurrentPrice(updatedAsset.priceUsd);

        if (parseFloat(updatedAsset.priceUsd) > parseFloat(oldPrice)) {
          setPriceDirection('up');
        } else if (parseFloat(updatedAsset.priceUsd) < parseFloat(oldPrice)) {
          setPriceDirection('down');
        }

        // Call the onUpdate callback if provided
        if (onUpdate) {
          onUpdate(updatedAsset);
        }

        // Reset direction after animation completes
        setTimeout(() => {
          setPriceDirection(null);
        }, 1000);
      } catch (error) {
        console.error('Error fetching price update:', error);
      }
    };

    // Update price every 5 seconds
    const interval = setInterval(fetchLatestPrice, 5000);

    return () => clearInterval(interval);
  }, [asset.id, currentPrice, onUpdate]);

  const isPositive = parseFloat(asset.changePercent24Hr) >= 0;

  return (
    <div className="flex flex-col items-center space-y-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-xl font-semibold">{asset.name} ({asset.symbol})</h3>
      <div
        className={`text-3xl font-bold transition-colors duration-500 ${priceDirection === 'up'
          ? 'text-green-500'
          : priceDirection === 'down'
            ? 'text-red-500'
            : ''
          }`}
      >
        {formatPrice(currentPrice)}
      </div>
      <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {formatPercentage(asset.changePercent24Hr)} (24h)
      </div>
    </div>
  );
} 