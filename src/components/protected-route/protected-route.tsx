import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectUser } from '../../features/user/selectors';
import { Preloader } from '@ui';
interface ProtectedRouteProps {
  onlyForAuth?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyForAuth = true,
  children
}) => {
  const { user, isAuth, isLoading } = useAppSelector(selectUser);

  if (isLoading) {
    return <Preloader />;
  }

  if (onlyForAuth && !user) {
    return <Navigate to='/login' replace />;
  }

  if (!onlyForAuth && user) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
