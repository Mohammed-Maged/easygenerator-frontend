import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../utils/tokenStorage';

const PrivateRoute: React.FC = () => {
  const accessToken = getAccessToken();

  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
