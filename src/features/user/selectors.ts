import { RootState } from '../../services/store';

export const selectUser = (state: RootState) => state.user;
