import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/custom.scss';
import {
  Button,
  Header,
  Input,
} from '../../components/index';


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
    <div className='border auth-form'>
      <Header title={'Login Page'} />

      <form onSubmit={handleSubmit} className='form mb-4'>
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
      <p>
        Don't have an account?
        <button
          className='redirect-button'
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
