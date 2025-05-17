'use client';

import { useEffect } from 'react';
import { CryptoRow } from '@/components/CryptoRow';
import { useAppDispatch, useAppSelector } from '@/Store/hooks';
import { fetchAssets, setAssets } from '@/Store/features/cryptoSlice';
import { CryptoAsset } from '@/utilities/types';

export default function CryptoList(
  { initialData }:
    { initialData: CryptoAsset[] }
) {
  const dispatch = useAppDispatch();
  const { assets, error } = useAppSelector((state) => state.crypto);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      dispatch(setAssets(initialData));
    } else if (!initialData || initialData.length === 0) {
      dispatch(fetchAssets());
    }

    const intervalId = setInterval(() => {
      dispatch(fetchAssets());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [initialData, dispatch]);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <th className="py-3 px-4 text-left font-medium">
              <button className="flex items-center">
                Rank <span className="ml-1">▼</span>
              </button>
            </th>
            <th className="py-3 px-4 text-left font-medium">Name</th>
            <th className="py-3 px-4 text-right font-medium">Price</th>
            <th className="py-3 px-4 text-right font-medium">Market Cap</th>
            <th className="py-3 px-4 text-right font-medium">VWAP (24Hr)</th>
            <th className="py-3 px-4 text-right font-medium">Supply</th>
            <th className="py-3 px-4 text-right font-medium">Volume (24Hr)</th>
            <th className="py-3 px-4 text-right font-medium">Change (24Hr)</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 && assets.map((asset) => {
            return <CryptoRow key={asset.id} asset={asset} />
          })}
        </tbody>
      </table>
    </div>
  );
} 