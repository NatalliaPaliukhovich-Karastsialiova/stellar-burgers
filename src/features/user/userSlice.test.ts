import reducer, {
  loginUser,
  registerUser,
  updateUser,
  logout
} from './userSlice';
import { TUser } from '@utils-types';

const initialState = {
  user: null,
  isLoading: false,
  error: undefined,
  isAuth: false
};

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

describe('userSlice', () => {
  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
  });

  it('should handle loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type, payload: 'Login failed' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Login failed');
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
  });

  it('should handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Register failed'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Register failed');
  });

  it('should handle logout.pending', () => {
    const stateWithUser = { ...initialState, user: mockUser, isAuth: true };
    const action = { type: logout.pending.type };
    const state = reducer(stateWithUser, action);
    expect(state.isLoading).toBe(true);
  });

  it('should handle logout.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser, isAuth: true };
    const action = { type: logout.fulfilled.type };
    const state = reducer(stateWithUser, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should handle logout.rejected', () => {
    const action = { type: logout.rejected.type, payload: 'Logout failed' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Logout failed');
  });

  it('should handle updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(updatedUser);
  });

  it('should handle updateUser.rejected', () => {
    const action = { type: updateUser.rejected.type, payload: 'Update failed' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Update failed');
  });
});
