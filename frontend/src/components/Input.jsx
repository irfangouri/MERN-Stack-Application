import React from 'react';

export default function Input({ label, setField, type }) {
  return (
    <div className='input-group flex-nowrap my-2'>
      <span class="input-group-text" id="addon-wrapping">{label}</span>
      <input
        type={type}
        class="form-control"
        placeholder={`Enter Your ${label}`}
        aria-describedby="addon-wrapping"
        onChange={(e) => setField(e.target.value)}
      />
    </div>
  );
}
