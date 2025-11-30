import reducer, {
  fetchOrdersThunk,
  fetchOrderByNumberThunk,
  initialState
} from './orderSlice';

const mockOrders = [{ _id: '1', number: 1 }];
const mockOrderResponse = { orders: [{ _id: '1', number: 1 }] };

describe('orderSlice', () => {
  it('should handle fetchOrdersThunk.pending', () => {
    const action = { type: fetchOrdersThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrdersThunk.fulfilled', () => {
    const action = {
      type: fetchOrdersThunk.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('should handle fetchOrdersThunk.rejected', () => {
    const action = { type: fetchOrdersThunk.rejected.type, payload: 'Error' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchOrderByNumberThunk.pending', () => {
    const action = { type: fetchOrderByNumberThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrderByNumberThunk.fulfilled', () => {
    const action = {
      type: fetchOrderByNumberThunk.fulfilled.type,
      payload: mockOrderResponse
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.selectedOrder).toEqual(mockOrderResponse.orders[0]);
  });

  it('should handle fetchOrderByNumberThunk.rejected', () => {
    const action = {
      type: fetchOrderByNumberThunk.rejected.type,
      payload: 'Error'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
