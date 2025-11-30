import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerConstructorReducer from '../features/burger-constructor/burgerConstructorSlice';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import feedReducer from '../features/feed/feedSlice';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/orders/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  useDispatch,
  useSelector
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
