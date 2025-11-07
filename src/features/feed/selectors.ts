import { RootState } from '../../services/store';

export const selectFeeds = (state: RootState) => state.feed;
export const selectedFeed = (state: RootState) => state.feed.selectedFeed;
