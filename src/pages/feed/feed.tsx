import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedsThunk } from '../../features/feed/feedSlice';
import { RootState, AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { feed, isLoading } = useSelector((state: RootState) => state.feed);
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
