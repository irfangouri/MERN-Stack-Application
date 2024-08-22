import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import {
  Button,
  Header,
  Input,
} from '../../components/index';

import '../../styles/custom.scss';

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const accessToken = localStorage.getItem('access-token');
  const userId = localStorage.getItem('user-id');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  }

  useEffect(() => {
    if (accessToken) {
      navigate(`/user/${userId}`);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className='auth-form'>
      <Header title={'Login Page'} />

      <form onSubmit={handleSubmit} className='mb-4'>
        <Input
          label={'Email'}
          setField={setEmail}
          type={'email'}
        />

        <Input
          label={'Password'}
          setField={setPassword}
          type={'password'}
        />

        <Button
          title={'Login'}
        />
      </form>

      <p>OR</p>
      <p>Don't have an account? <button onClick={() => navigate('/signup')} className='redirect-button'>Sign Up</button></p>
    </div>
  );
}

export default Login;
