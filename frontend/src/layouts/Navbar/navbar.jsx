import React from 'react';

const Navbar = ({ children }) => {
  return (
    <div>
      <div>
        <h3>ToDo</h3>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Admin</li>
        </ul>

        <button>Logout</button>
      </div>

      <br />
      <br />
      <br />

      {children}
    </div>
  );
}

export default Navbar;
