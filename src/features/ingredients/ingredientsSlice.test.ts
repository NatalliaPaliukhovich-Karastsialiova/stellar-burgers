import reducer, {
  fetchIngredients,
  getIngredientByID,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Test',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 10,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile'
};

const mockIngredients = [mockIngredient];

describe('ingredientsSlice', () => {
  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toEqual(mockIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Error fetching';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  it('should get ingredient by ID', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: mockIngredients
    };
    const newState = reducer(stateWithIngredients, getIngredientByID('1'));
    expect(newState.selectedIngredient).toEqual(mockIngredients[0]);
  });

  it('should return null if ingredient ID not found', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: mockIngredients
    };
    const newState = reducer(stateWithIngredients, getIngredientByID('999'));
    expect(newState.selectedIngredient).toBeNull();
  });
});
