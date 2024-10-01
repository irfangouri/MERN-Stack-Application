import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const signup = async (
    name,
    email,
    password,
    confirmPassword,
  ) => {
    try {
      const response = await registerUser(
        name,
        email,
        password,
        confirmPassword,
      );

      if (response?.data) {
        navigate('/login');
      }
    } catch (err) {
      alert(`Error: ${err.response.data}`);
    }
  }

  const login = async (
    email,
    password,
  ) => {
    try {
      const response = await loginUser(
        email,
        password,
      );

      localStorage.setItem('access-token', response.data.user.accessToken);
      localStorage.setItem('user-id', response.data.user.id);

      navigate(`/user/${response.data.user.id}`);
    } catch (err) {
      alert(`${err.response.data}`);
    }
  }

  const logout = async () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user-id');

    navigate('/login');
  }

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
