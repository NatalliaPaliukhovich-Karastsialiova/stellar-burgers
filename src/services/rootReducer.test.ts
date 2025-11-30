import { rootReducer } from './store';
import burgerConstructorReducer from '../features/burger-constructor/burgerConstructorSlice';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import feedReducer from '../features/feed/feedSlice';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/orders/orderSlice';

describe('rootReducer', () => {
  it('should return initial state when called with undefined state and unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.user).toEqual(userReducer(undefined, { type: 'UNKNOWN_ACTION' }));
    expect(state.feed).toEqual(feedReducer(undefined, { type: 'UNKNOWN_ACTION' }));
    expect(state.ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(state.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(state.order).toEqual(orderReducer(undefined, { type: 'UNKNOWN_ACTION' }));
  });
});
