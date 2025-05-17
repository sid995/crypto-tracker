import { CryptoAsset } from '@/utilities/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface CryptoState {
  assets: CryptoAsset[];
  selectedAsset: CryptoAsset | null;
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  assets: [],
  selectedAsset: null,
  loading: false,
  error: null,
};

export const fetchAssets = createAsyncThunk(
  'crypto/fetchAssets',
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE}/assets`, {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
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
        'authorization': `Bearer ${process.env.NEXT_PUBLIC_COINCAP_KEY}`
      }
    });
    const data = await response.json();
    return data.data;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssetPrice: (state, action: PayloadAction<CryptoAsset>) => {
      // Update a single asset's price for real-time updates
      const index = state.assets.findIndex(asset => asset.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }

      // If this is the currently selected asset, update it too
      if (state.selectedAsset && state.selectedAsset.id === action.payload.id) {
        state.selectedAsset = action.payload;
      }
    },
    setAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
      state.loading = false;
    },
    setSelectedAsset: (state, action: PayloadAction<CryptoAsset>) => {
      state.selectedAsset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action: PayloadAction<CryptoAsset[]>) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      .addCase(fetchAssetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetById.fulfilled, (state, action: PayloadAction<CryptoAsset>) => {
        state.loading = false;
        state.selectedAsset = action.payload;
      })
      .addCase(fetchAssetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch asset details';
      });
  },
});

export const { updateAssetPrice, setAssets, setSelectedAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer; 