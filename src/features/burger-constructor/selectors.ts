import { RootState } from '../../services/store';

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor.constructorItems;

export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;

export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;
