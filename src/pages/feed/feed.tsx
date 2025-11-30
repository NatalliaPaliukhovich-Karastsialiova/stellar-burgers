import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeedsThunk } from '../../features/feed/feedSlice';
import { selectFeeds } from '../../features/feed/selectors';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { feed, isLoading } = useAppSelector(selectFeeds);
  const orders = feed.orders;
  useEffect(() => {
    dispatch(fetchFeedsThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchFeedsThunk())}
    />
  );
};
