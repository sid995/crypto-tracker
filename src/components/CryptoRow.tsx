'use client';

import { CryptoAsset } from '@/utilities/types';
import { formatPrice, formatPercentage, formatLargeNumber } from '@/utilities/utils';
import { useRouter } from 'next/navigation';

interface CryptoRowProps {
  asset: CryptoAsset;
}

export function CryptoRow({ asset }: CryptoRowProps) {
  const router = useRouter();
  const isPositive = parseFloat(asset.changePercent24Hr) >= 0;

  const handleRowClick = () => {
    router.push(`/coin/${asset.id}`);
  };

  return (
    <tr
      className={`cursor-pointer border-t border-gray-200 text-gray-700 dark:border-gray-700 hover:bg-gray-100 bg-gray-50 dark:bg-gray-750`}
      onClick={handleRowClick}
    >
      <td className="py-4 px-4">{asset.rank}</td>
      <td className="py-4 px-4">
        {/* https://assets.coincap.io/assets/icons/btc2@2x.png */}

        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mr-3">
            <span className="font-medium text-sm text-white">{asset.symbol.charAt(0)}</span>
          </div>
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{asset.symbol}</div>
          </div>
        </div>

      </td>
      <td className="py-4 px-4 text-right font-medium">{formatPrice(asset.priceUsd)}</td>
      <td className="py-4 px-4 text-right">${formatLargeNumber(asset.marketCapUsd)}</td>
      <td className="py-4 px-4 text-right">{formatPrice(asset.vwap24Hr)}</td>
      <td className="py-4 px-4 text-right">{parseFloat(asset.supply).toLocaleString('en-US', { maximumFractionDigits: 2 })}m</td>
      <td className="py-4 px-4 text-right">${formatLargeNumber(asset.volumeUsd24Hr)}</td>
      <td className={`py-4 px-4 text-right font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {formatPercentage(asset.changePercent24Hr)}
      </td>
    </tr>
  );
}