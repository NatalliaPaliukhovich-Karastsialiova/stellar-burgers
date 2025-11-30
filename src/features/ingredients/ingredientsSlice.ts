import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
  selectedIngredient: TIngredient | null;
}
const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
  selectedIngredient: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Ошибка загрузки ингредиентов');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientByID: (state, action: PayloadAction<string>) => {
      state.selectedIngredient =
        state.ingredients.find((ing) => ing._id === action.payload) ?? null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ingredients = payload;
      })
      .addCase(fetchIngredients.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  }
});

export const { getIngredientByID } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
