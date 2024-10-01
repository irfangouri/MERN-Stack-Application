import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/custom.scss';
import {
  Button,
  Header,
  Input
} from '../../components/index';


const Signup = () => {
  const navigate = useNavigate();

  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const accessToken = localStorage.getItem('access-token');
  const userId = localStorage.getItem('user-id');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(name, email, password, confirmPassword);
  }

  useEffect(() => {
    if (accessToken) {
      navigate(`/user/${userId}`);
    } else {
      navigate('/signup');
    }
  }, []);

  return (
    <div className='border auth-form'>
      <Header title={'Sign Up Page'} />

      <form onSubmit={handleSubmit} className='form mb-4'>
        <Input
          label={'Name'}
          setField={setName}
          type={'text'}
        />

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

        <Input
          label={'Confirm Password'}
          setField={setConfirmPassword}
          type={'password'}
        />

        <Button
          title={'Sign Up'}
        />
      </form>

      <p>OR</p>
      <p>
        Already have an account?
        <button
          className='redirect-button'
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
