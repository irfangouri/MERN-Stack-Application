import React from 'react';

const Header = ({ title }) => {
  return (
    <div>
      <p
        className='text-uppercase fs-1 lw-ligher mt-3'
      >
        {title}
      </p>
    </div>
  );
}

export default Header;
