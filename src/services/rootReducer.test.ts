import { rootReducer } from './store';
import burgerConstructorReducer from '../features/burger-constructor/burgerConstructorSlice';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import feedReducer from '../features/feed/feedSlice';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/orders/orderSlice';

describe('rootReducer', () => {
  it('should initialize each slice with its initial state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.user).toEqual(userReducer(undefined, { type: '@@INIT' }));
    expect(state.feed).toEqual(feedReducer(undefined, { type: '@@INIT' }));
    expect(state.ingredients).toEqual(
      ingredientsReducer(undefined, { type: '@@INIT' })
    );
    expect(state.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: '@@INIT' })
    );
    expect(state.order).toEqual(orderReducer(undefined, { type: '@@INIT' }));
  });
});
