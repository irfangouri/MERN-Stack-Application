import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
import Landing from '../pages/landing/Landing';
import Navbar from '../layouts/navbar/Navbar';

const Routing = () => {
  return (
    <Routes>
        {/* Authentication */}
        <Route
          path='/*'
          element={
            <AuthProvider>
              <Login />
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
          path='/user/*'
          element={
            <AuthProvider>
              <Navbar>
                <Landing />
              </Navbar>
            </AuthProvider>
          }
        />

        <Route
          path='/user/:userId'
          element={
            <AuthProvider>
              <Navbar>
                <Landing />
              </Navbar>
            </AuthProvider>
          }
        />
    </Routes>
  );
}

export default Routing;
