import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TConstructorIngredient, TOrder } from '@utils-types';

export type constructorItem = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

interface BurgerConstructorState {
  constructorItems: constructorItem;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: BurgerConstructorState = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrderThunk = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (ingredientItems: constructorItem, { rejectWithValue }) => {
    try {
      const ingredientsIds: string[] = [];
      if (ingredientItems.bun?._id)
        ingredientsIds.push(ingredientItems.bun?._id);
      ingredientItems.ingredients.forEach((item) =>
        ingredientsIds.push(item._id)
      );
      if (ingredientItems.bun?._id)
        ingredientsIds.push(ingredientItems.bun?._id);
      const response = await orderBurgerApi(ingredientsIds);
      return response.order;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    },
    clearConstructor: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    setBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, { payload }) => {
        state.orderRequest = false;
        state.orderModalData = payload;
      })
      .addCase(createOrderThunk.rejected, (state, { payload }) => {
        state.orderRequest = false;
        state.error = payload as string;
      });
  }
});

export const {
  clearOrder,
  clearConstructor,
  addIngredient,
  setBun,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
