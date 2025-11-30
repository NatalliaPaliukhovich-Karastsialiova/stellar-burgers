import reducer, { fetchFeedsThunk, fetchFeedThunk } from './feedSlice';

const initialState = {
  isLoading: false,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  selectedFeed: null,
  error: null
};

const mockFeedData = {
  orders: [{ _id: '1', number: 1 }],
  total: 100,
  totalToday: 10
};

const mockOrder = { _id: '1', number: 1 };

describe('feedSlice', () => {
  it('should handle fetchFeedsThunk.pending', () => {
    const action = { type: fetchFeedsThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeedsThunk.fulfilled', () => {
    const action = {
      type: fetchFeedsThunk.fulfilled.type,
      payload: mockFeedData
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.feed).toEqual(mockFeedData);
  });

  it('should handle fetchFeedsThunk.rejected', () => {
    const action = { type: fetchFeedsThunk.rejected.type, payload: 'Error' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchFeedThunk.pending', () => {
    const action = { type: fetchFeedThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.selectedFeed).toBeNull();
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeedThunk.fulfilled', () => {
    const action = { type: fetchFeedThunk.fulfilled.type, payload: mockOrder };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.selectedFeed).toEqual(mockOrder);
  });

  it('should handle fetchFeedThunk.rejected', () => {
    const action = { type: fetchFeedThunk.rejected.type, payload: 'Error' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
