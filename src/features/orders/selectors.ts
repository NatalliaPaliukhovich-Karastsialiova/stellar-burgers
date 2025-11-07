import { RootState } from '../../services/store';

export const selectedOrder = (state: RootState) => state.order.selectedOrder;
export const selectOrders = (state: RootState) => state.order.orders;
