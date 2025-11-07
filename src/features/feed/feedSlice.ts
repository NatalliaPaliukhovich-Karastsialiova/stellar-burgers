import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface FeedState {
  isLoading: boolean;
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  selectedFeed: TOrder | null;
  error: string | null;
}

const initialState: FeedState = {
  isLoading: false,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  selectedFeed: null,
  error: null
};

export const fetchFeedsThunk = createAsyncThunk(
  'feed/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка при загрузке заказов');
    }
  }
);

export const fetchFeedThunk = createAsyncThunk(
  'feed/fetchFeed',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(id);
      if (data.orders.length > 0) return data.orders[0];
      return null;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка при получении заказа');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setSelectedFeed: (state, action) => {
      state.selectedFeed = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFeedThunk.pending, (state) => {
        state.isLoading = true;
        state.selectedFeed = null;
        state.error = null;
      })
      .addCase(fetchFeedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedFeed = action.payload;
      })
      .addCase(fetchFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedSlice.reducer;
export const { setSelectedFeed } = feedSlice.actions;
