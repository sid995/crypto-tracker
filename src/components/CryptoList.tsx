'use client';

import { useEffect } from 'react';
import CryptoCard from '@/components/CryptoCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '@/Store/hooks';
import { setAssets } from '@/Store/features/cryptoSlice';
import { CryptoAsset } from '@/utilities/types';

export default function CryptoList(
  { initialData }:
    { initialData: CryptoAsset[] }
) {
  const dispatch = useAppDispatch();
  const { assets, loading, error } = useAppSelector((state) => state.crypto);
  useEffect(() => {
    if (initialData) {
      dispatch(setAssets(initialData));
    }
  }, [initialData, dispatch]);

  if (loading && assets.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map((asset) => (
        <CryptoCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
} 