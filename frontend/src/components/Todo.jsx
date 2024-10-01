// import React, { useState } from 'react';
// import '../styles/custom.scss';
// import { HiOutlineDotsVertical } from 'react-icons/hi';

// const Todo = () => {
//   const [todos, setTodos] = useState([
//     {
//       title: 'Gym 1',
//       description: 'Go to gym and buy grocery',
//       status: 'pending',
//       priority: 'medium',
//       dueDate: '2024-08-07T17:49:07.216+00:00'
//     },
//     {
//       title: 'Gym 2',
//       description: 'Go to gym and buy grocery, and you have to go to somewhere else as well. Go get a job and enjoy programming and stuff in real life and stuff...',
//       status: 'pending',
//       priority: 'medium',
//       dueDate: '2024-08-07T17:49:07.216+00:00'
//     }
//   ]);

//   const [dropdownMenu, setDropDownMenu] = useState(false);
//   const dropdownItems = ['Edit', 'Delete'];

//   return (
//     <div>
//       {todos.map((todo) => (
//         <div className='border todo'>
//           <div>
//             <h1>{todo.title}</h1>
//             <HiOutlineDotsVertical />
//             {dropdownMenu && (
//               <div>
                
//               </div>
//             )}
//           </div>
//           <p>{todo.description}</p>
//           <span>Status: {todo.status}</span>
//           <span>Priority: {todo.priority}</span>
//           <span>Due Date: {todo.dueDate}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Todo;
import React, { useState, useEffect, useRef } from 'react';
import '../styles/custom.scss';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Dropdown } from 'react-bootstrap';

const Todo = () => {
  const [todos, setTodos] = useState([
    {
      title: 'Gym 1',
      description: 'Go to gym and buy grocery',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-08-07T17:49:07.216+00:00'
    },
    {
      title: 'Gym 2',
      description: 'Go to gym and buy grocery, and you have to go to somewhere else as well. Go get a job and enjoy programming and stuff in real life and stuff...',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-08-07T17:49:07.216+00:00'
    }
  ]);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Track which dropdown is open
  const dropdownItems = ['Edit', 'Delete'];
  const dropdownRef = useRef(null); // Reference for closing on outside click

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null); // Close dropdown if clicked outside
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index); // Toggle specific dropdown
  };

  return (
    <div className='container mt-4'>
      {todos.map((todo, index) => (
        <div className='border todo p-3 mb-3 position-relative' key={index}>
          <div className='d-flex justify-content-between align-items-center'>
            <h1 className='h5'>{todo.title}</h1>
            <div className='position-relative'>
              <HiOutlineDotsVertical onClick={() => toggleDropdown(index)} style={{ cursor: 'pointer' }} />
              {openDropdownIndex === index && (
                <div className='dropdown-menu show' ref={dropdownRef} style={{ position: 'absolute', top: '20px', right: '0' }}>
                  {dropdownItems.map((item, i) => (
                    <button key={i} className='dropdown-item' onClick={() => alert(`${item} clicked`)}>
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p>{todo.description}</p>
          <div className='d-flex flex-column'>
            <span>Status: {todo.status}</span>
            <span>Priority: {todo.priority}</span>
            <span>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
