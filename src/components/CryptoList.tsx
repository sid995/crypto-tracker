'use client';

import { useEffect } from 'react';
import { CryptoRow } from '@/components/CryptoRow';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAssets, selectAssets, setAssets } from '@/store/features/cryptoSlice';
import { CryptoAsset } from '@/utilities/types';
import { RootState } from '@/store/store';

export default function CryptoList(
  { initialData }:
    { initialData: CryptoAsset[] }
) {
  const dispatch = useAppDispatch();
  const assets = useAppSelector(selectAssets)
  const error = useAppSelector((state: RootState) => state.crypto.error)

  useEffect(() => {
    if (initialData?.length) {
      dispatch(setAssets(initialData))
    } else {
      dispatch(fetchAssets())
    }

    const intervalId = setInterval(() => {
      dispatch(fetchAssets())
    }, 5000)

    return () => clearInterval(intervalId)
  }, [initialData, dispatch])

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
          {assets.length > 0 && assets.map((asset: CryptoAsset) => {
            return <CryptoRow key={asset.id} id={asset.id} />
          })}
        </tbody>
      </table>
    </div>
  );
} 