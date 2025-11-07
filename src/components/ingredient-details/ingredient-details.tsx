import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  selectSelectedIngredient,
  selectIngredients
} from '../../features/ingredients/selectors';
import { getIngredientByID } from '../../features/ingredients/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const ingredientData = useAppSelector(selectSelectedIngredient);
  const { ingredients } = useAppSelector(selectIngredients);

  useEffect(() => {
    if (id && ingredients.length > 0) dispatch(getIngredientByID(id));
  }, [id, ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
