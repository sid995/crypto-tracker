import { CryptoAsset } from '@/utilities/types';
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '@/Store/store';


const assetsAdapter = createEntityAdapter<CryptoAsset>({
  // selectId: (a: CryptoAsset) => a.id,
  sortComparer: (a, b) => Number(a.rank) - Number(b.rank),
})


const initialState = assetsAdapter.getInitialState({
  selectedAsset: null as CryptoAsset | null,
  loading: false,
  error: null as string | null,
})

export const fetchAssets = createAsyncThunk(
  'crypto/fetchAssets',
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets?limit=20`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets/${slug}`, {
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
  selectAll: selectAssets,
  selectById: selectAssetById,
  selectIds: selectAssetIds,
} = assetsAdapter.getSelectors((s: RootState) => s.crypto)

export const {
  setAssets,
  setSelectedAsset,
} = cryptoSlice.actions

export default cryptoSlice.reducer