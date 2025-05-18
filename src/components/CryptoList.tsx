'use client';

import { useEffect } from 'react';
import { CryptoRow } from '@/components/CryptoRow';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchAssets,
  setAssets,
  setSortField,
  setFilterValue,
  selectSortedAndFilteredAssets,
  type SortField
} from '@/store/features/cryptoSlice';
import { CryptoAsset } from '@/libs/types';
import { RootState } from '@/store/store';

interface SortButtonProps {
  field: SortField;
  children: React.ReactNode;
  currentField: SortField;
  direction: 'asc' | 'desc';
}

const SortButton = ({ field, children, currentField, direction }: SortButtonProps) => {
  const dispatch = useAppDispatch();
  const isActive = field === currentField;

  return (
    <button
      className={`cursor-pointer flex items-center hover:text-gray-900 dark:hover:text-gray-100 ${isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
        }`}
      onClick={() => dispatch(setSortField(field))}
    >
      {children}
      {isActive && (
        <span className="ml-1">
          {direction === 'asc' ? '▲' : '▼'}
        </span>
      )}
    </button>
  );
};

export default function CryptoList(
  { initialData }:
    { initialData: CryptoAsset[] }
) {
  const dispatch = useAppDispatch();
  const assets = useAppSelector(selectSortedAndFilteredAssets);
  const error = useAppSelector((state: RootState) => state.crypto.error);
  const { sortField, sortDirection, filterValue } = useAppSelector((state: RootState) => state.crypto);

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
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Filter by name or symbol..."
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value={filterValue}
          onChange={(e) => dispatch(setFilterValue(e.target.value))}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="py-3 px-4 text-left font-medium">
                <SortButton field="rank" currentField={sortField} direction={sortDirection}>
                  Rank
                </SortButton>
              </th>
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-right font-medium">
                <SortButton field="priceUsd" currentField={sortField} direction={sortDirection}>
                  Price
                </SortButton>
              </th>
              <th className="py-3 px-4 text-right font-medium">Market Cap</th>
              <th className="py-3 px-4 text-right font-medium">VWAP (24Hr)</th>
              <th className="py-3 px-4 text-right font-medium">Supply</th>
              <th className="py-3 px-4 text-right font-medium">
                <SortButton field="volumeUsd24Hr" currentField={sortField} direction={sortDirection}>
                  Volume (24Hr)
                </SortButton>
              </th>
              <th className="py-3 px-4 text-right font-medium">
                <SortButton field="changePercent24Hr" currentField={sortField} direction={sortDirection}>
                  Change (24Hr)
                </SortButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 && assets.map((asset: CryptoAsset) => {
              return <CryptoRow key={asset.id} id={asset.id} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 