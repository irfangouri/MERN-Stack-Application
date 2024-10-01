import React from 'react';

const Dropdown = ({ label, options, setField }) => {
  return (
    <div className="input-group flex-nowrap my-2">
      <span className="input-group-text w-25" id="addon-wrapping">{label}</span>
      <select
        id="inputState"
        className="form-control"
        aria-describedby="addon-wrapping"
        onChange={(e) => setField(e.target.value)}
      >
        <option value="" disabled selected>Choose {label} From Options:</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
