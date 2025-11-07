import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectBurgerConstructor,
  selectOrderModalData,
  selectOrderRequest
} from '../../features/burger-constructor/selectors';
import {
  createOrderThunk,
  clearOrder,
  clearConstructor
} from '../../features/burger-constructor/burgerConstructorSlice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/user/selectors';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  const constructorItems = useAppSelector(selectBurgerConstructor);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(selectUser);

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (constructorItems.bun && !orderRequest)
      dispatch(createOrderThunk(constructorItems));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
