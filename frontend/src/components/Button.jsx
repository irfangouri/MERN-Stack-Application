import React from 'react';

const Button = ({ title }) => {
  return (
    <div className='d-grid gap-2 col-8 mx-auto mt-4'>
      <button
        type='submit'
        className='btn btn-primary'
      >{title}</button>
    </div>
  );
}

export default Button;
