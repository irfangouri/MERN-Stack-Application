import React from 'react';

const Input = ({ label, setField, type }) => {
  return (
    <div className='input-group flex-nowrap my-2'>
      <span className="input-group-text w-25" id="addon-wrapping">{label}</span>
      <input
        type={type}
        className="form-control"
        placeholder={`Enter Your ${label}`}
        aria-describedby="addon-wrapping"
        onChange={(e) => setField(e.target.value)}
      />
    </div>
  );
}

export default Input;
