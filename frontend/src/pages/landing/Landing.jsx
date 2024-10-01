import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Todo from '../../components/Todo';
import AddTodo from '../../components/AddTodo';

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
  }, []);

  return (
    <div>
      {/* <AddTodo /> */}
      <Todo />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Landing;
