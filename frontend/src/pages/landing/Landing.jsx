import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Landing = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const accessToken = localStorage.getItem('access-token');
  const userId = localStorage.getItem('user-id');

  useEffect(() => {
    if (accessToken) {
      navigate(`/user/${userId}`);
    } else {
      navigate('/login');
    }
  })

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
      Hello world!!!
    </div>
  );
}

export default Landing;
