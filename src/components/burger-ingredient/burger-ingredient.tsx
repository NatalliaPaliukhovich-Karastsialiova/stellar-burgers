import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import {
  addIngredient,
  setBun
} from '../../features/burger-constructor/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      const newIngredient: TConstructorIngredient = {
        ...ingredient,
        id: uuidv4()
      };
      ingredient.type === 'bun'
        ? dispatch(setBun(newIngredient))
        : dispatch(addIngredient(newIngredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
