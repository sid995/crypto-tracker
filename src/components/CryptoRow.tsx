'use client';

import { selectAssetById } from '@/store/features/cryptoSlice';
import { useAppSelector } from '@/store/hooks';
import { formatPrice, formatPercentage, formatLargeNumber } from '@/libs/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useRef, useEffect } from 'react';

interface CryptoRowProps {
  id: string;
}

export const CryptoRow = ({ id }: CryptoRowProps) => {
  const asset = useAppSelector(s => selectAssetById(s, id))
  const router = useRouter()

  const [flash, setFlash] = useState<'up' | 'down' | null>(null)
  const prev = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!asset) return
    if (prev.current !== undefined) {
      if (parseFloat(asset.priceUsd) > prev.current) setFlash('up')
      else if (parseFloat(asset.priceUsd) < prev.current) setFlash('down')
    }
    prev.current = parseFloat(asset.priceUsd)
    if (flash) {
      const t = setTimeout(() => setFlash(null), 1_000)
      return () => clearTimeout(t)
    }
  }, [asset, flash])

  if (!asset) return null

  const isPositive = parseFloat(asset.changePercent24Hr) >= 0

  const priceClass =
    flash === 'up'
      ? 'bg-green-200'
      : flash === 'down'
        ? 'bg-red-200'
        : 'bg-gray-100'

  return (
    <tr
      className={`cursor-pointer text-gray-900 border-t border-gray-200 hover:bg-gray-300 ${priceClass} transition-colors duration-300`}
      onClick={() => router.push(`/coin/${asset.id}`)}
    >
      <td className="py-4 px-4">{asset.rank}</td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-600">{asset.symbol}</div>
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
};

CryptoRow.displayName = 'CryptoRow';