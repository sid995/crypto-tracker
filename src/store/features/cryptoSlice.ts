import { CryptoAsset } from '@/libs/types';
import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export type SortField = 'rank' | 'priceUsd' | 'volumeUsd24Hr' | 'changePercent24Hr';
export type SortDirection = 'asc' | 'desc';

const assetsAdapter = createEntityAdapter<CryptoAsset>({
  sortComparer: (a, b) => Number(a.rank) - Number(b.rank),
})

const initialState = assetsAdapter.getInitialState({
  selectedAsset: null as CryptoAsset | null,
  loading: false,
  error: null as string | null,
  sortField: 'rank' as SortField,
  sortDirection: 'asc' as SortDirection,
  filterValue: '' as string,
})

export const {
  selectAll: selectAssets,
  selectById: selectAssetById,
  selectIds: selectAssetIds,
} = assetsAdapter.getSelectors((s: RootState) => s.crypto);

const selectFilterValue = (state: RootState) => state.crypto.filterValue;
const selectSortField = (state: RootState) => state.crypto.sortField;
const selectSortDirection = (state: RootState) => state.crypto.sortDirection;

const selectFilteredAssets = createSelector(
  [selectAssets, selectFilterValue],
  (assets, filterValue) => {
    if (!filterValue) return assets;
    const searchTerm = filterValue.toLowerCase();
    return assets.filter(asset =>
      asset.name.toLowerCase().includes(searchTerm) ||
      asset.symbol.toLowerCase().includes(searchTerm)
    );
  }
);

export const selectSortedAndFilteredAssets = createSelector(
  [selectFilteredAssets, selectSortField, selectSortDirection],
  (filteredAssets, sortField, sortDirection) => {
    return [...filteredAssets].sort((a, b) => {
      const aValue = parseFloat(a[sortField]);
      const bValue = parseFloat(b[sortField]);
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return (aValue - bValue) * multiplier;
    });
  }
);

export const fetchAssets = createAsyncThunk(
  'crypto/fetchAssets',
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets?limit=20&t=${Date.now()}`, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    const data = await response.json();
    return data.data;
  }
);

export const fetchAssetById = createAsyncThunk(
  'crypto/fetchAssetById',
  async (slug: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets/${slug}?t=${Date.now()}`, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    const data = await response.json();
    return data.data;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setAssets: (state, { payload }: { payload: CryptoAsset[] }) => {
      assetsAdapter.setAll(state, payload)
      state.loading = false
    },
    setSelectedAsset: (state, { payload }: { payload: CryptoAsset | null }) => {
      state.selectedAsset = payload
    },
    setSortField: (state, { payload }: { payload: SortField }) => {
      if (state.sortField === payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = payload;
        state.sortDirection = 'asc';
      }
    },
    setFilterValue: (state, { payload }: { payload: string }) => {
      state.filterValue = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAssets.pending, s => {
        s.loading = true
        s.error = null
      })
      .addCase(fetchAssets.fulfilled, (s, a) => {
        s.loading = false
        assetsAdapter.setAll(s, a.payload)
      })
      .addCase(fetchAssets.rejected, (s, a) => {
        s.loading = false
        s.error = a.error.message ?? 'Failed to fetch assets'
      })
    builder
      .addCase(fetchAssetById.pending, s => {
        s.loading = true
        s.error = null
      })
      .addCase(fetchAssetById.fulfilled, (s, a) => {
        s.loading = false
        s.selectedAsset = a.payload
        assetsAdapter.upsertOne(s, a.payload)
      })
      .addCase(fetchAssetById.rejected, (s, a) => {
        s.loading = false
        s.error = a.error.message ?? 'Failed to fetch asset details'
      })
  },
})

export const {
  setAssets,
  setSelectedAsset,
  setSortField,
  setFilterValue,
} = cryptoSlice.actions

export default cryptoSlice.reducer