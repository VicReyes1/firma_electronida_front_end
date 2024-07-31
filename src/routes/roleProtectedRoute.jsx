import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  return token && user && user.rol ? children : <Navigate to="/" />;
};

export default RoleProtectedRoute;
