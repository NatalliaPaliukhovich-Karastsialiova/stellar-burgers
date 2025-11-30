import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setBun,
  clearConstructor,
  clearOrderModal,
  createOrderThunk,
  initialState
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

const mockIngredient: TConstructorIngredient = {
  _id: '1',
  id: 'test-id',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 10,
  image: 'image',
  image_mobile: 'image_mobile',
  image_large: 'image_large'
};

const mockBun: TConstructorIngredient = {
  ...mockIngredient,
  type: 'bun',
  name: 'Test Bun'
};

describe('burgerConstructorSlice', () => {
  it('should add ingredient', () => {
    const newState = reducer(initialState, addIngredient(mockIngredient));
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual(mockIngredient);
  });

  it('should set bun', () => {
    const newState = reducer(initialState, setBun(mockBun));
    expect(newState.constructorItems.bun).toEqual(mockBun);
  });

  it('should remove ingredient', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [mockIngredient]
      }
    };
    const newState = reducer(
      stateWithIngredient,
      removeIngredient(mockIngredient.id)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  it('should move ingredient up', () => {
    const ingredient1 = { ...mockIngredient, id: '1', name: '1' };
    const ingredient2 = { ...mockIngredient, id: '2', name: '2' };
    const state = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const newState = reducer(state, moveIngredientUp(1));
    expect(newState.constructorItems.ingredients[0]).toEqual(ingredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(ingredient1);
  });

  it('should move ingredient down', () => {
    const ingredient1 = { ...mockIngredient, id: '1', name: '1' };
    const ingredient2 = { ...mockIngredient, id: '2', name: '2' };
    const state = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const newState = reducer(state, moveIngredientDown(0));
    expect(newState.constructorItems.ingredients[0]).toEqual(ingredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(ingredient1);
  });

  it('should NOT move ingredient up if index is 0', () => {
    const ingredient1 = { ...mockIngredient, id: '1', name: '1' };
    const ingredient2 = { ...mockIngredient, id: '2', name: '2' };
    const state = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const newState = reducer(state, moveIngredientUp(0));
    expect(newState.constructorItems.ingredients[0]).toEqual(ingredient1);
    expect(newState.constructorItems.ingredients[1]).toEqual(ingredient2);
  });

  it('should NOT move ingredient down if index is last', () => {
    const ingredient1 = { ...mockIngredient, id: '1', name: '1' };
    const ingredient2 = { ...mockIngredient, id: '2', name: '2' };
    const state = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const newState = reducer(state, moveIngredientDown(1));
    expect(newState.constructorItems.ingredients[0]).toEqual(ingredient1);
    expect(newState.constructorItems.ingredients[1]).toEqual(ingredient2);
  });

  it('should clear constructor', () => {
    const stateWithItems = {
      ...initialState,
      constructorItems: { bun: mockBun, ingredients: [mockIngredient] }
    };
    const newState = reducer(stateWithItems, clearConstructor());
    expect(newState.constructorItems.bun).toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  it('should clear order modal', () => {
    const stateWithOrder = {
      ...initialState,
      orderRequest: true,
      orderModalData: { number: 123 } as any
    };
    const newState = reducer(stateWithOrder, clearOrderModal());
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toBeNull();
  });

  it('should handle createOrderThunk.pending', () => {
    const action = { type: createOrderThunk.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle createOrderThunk.fulfilled', () => {
    const mockOrder = { number: 123 } as any;
    const action = {
      type: createOrderThunk.fulfilled.type,
      payload: mockOrder
    };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toEqual(mockOrder);
    expect(newState.constructorItems.ingredients).toHaveLength(0);
    expect(newState.constructorItems.bun).toBeNull();
  });

  it('should handle createOrderThunk.rejected', () => {
    const action = {
      type: createOrderThunk.rejected.type,
      payload: 'Order failed'
    };
    const newState = reducer(initialState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('Order failed');
  });
});
