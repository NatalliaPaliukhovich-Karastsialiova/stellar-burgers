import { RootState } from '../../services/store';

export const selectIngredients = (state: RootState) => state.ingredients;

export const selectIsIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectSelectedIngredient = (state: RootState) =>
  state.ingredients.selectedIngredient;
