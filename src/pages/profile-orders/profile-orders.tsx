import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { selectOrders } from '../../features/orders/selectors';
import { fetchOrdersThunk } from '../../features/orders/orderSlice';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
