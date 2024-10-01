import React, { useState } from 'react';
import '../styles/custom.scss';
import {
  Button,
  Dropdown,
  Header,
  Input,
} from './index';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title
      || !description
      || !status
      || !priority
      || !dueDate
    ) {
      return alert('Please fill all the entries');
    }

    console.log('Title: ', title, ' Description: ', description, ' status: ', status, ' priority: ', priority, ' dueDate: ', dueDate);
  }

  return (
    <div className='border auth-form'>
      <Header title={'Add Todo'} />

      <form onSubmit={handleSubmit}>
        <Input
          type={'text'}
          label={'Title'}
          setField={setTitle}
        />
        <Input
          type={'text'}
          label={'Description'}
          setField={setDescription}
        />
        <Dropdown
          label={'Status'}
          setField={setStatus}
          options={['Pending', 'In-progress', 'Completed']}
        />
        <Dropdown
          label={'Priority'}
          setField={setPriority}
          options={['Low', 'Medium', 'High']}
        />
        <Input
          type={'date'}
          label={'Due Date'}
          setField={setDueDate}
        />
        <Button
          title={'Add Todo'}
        />
      </form>
    </div>
  );
}

export default AddTodo;
