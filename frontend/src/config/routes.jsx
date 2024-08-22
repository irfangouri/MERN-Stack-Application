import React, { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import { AuthProvider } from '../context/AuthContext';

const Signup = lazy(() => import('../pages/auth/Signup'));
const Login = lazy(() => import('../pages/auth/Login'));

const Routing = () => {
  const [accessToken, seAccessToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    seAccessToken(token);
  }, []);

  return (
    <Routes>
      {/* Authentication */}
      <Route
        path='/*'
        element={ accessToken === ''
          ? <AuthProvider>
              <Login />
            </AuthProvider>
          : <AuthProvider>
              <Landing />
            </AuthProvider>
        }
      />

      <Route
        path='/signup'
        element={
          <AuthProvider>
            <Signup />
          </AuthProvider>
        }
      />

      <Route
        path='/login'
        element={
          <AuthProvider>
            <Login />
          </AuthProvider>
        }
      />

      {/* Landing */}
      <Route
        path='/user/:userId'
        element={
          <AuthProvider>
            <Landing />
          </AuthProvider>
        }
      />
    </Routes>
  );
}

export default Routing;
