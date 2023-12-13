import React from 'react';
import AddTaskForm from './tasks/AddTaskForm';
import { withAuth } from '../context/AuthContext';

const AddTaskPage = () => {
  return (
    <div>
      <AddTaskForm />
    </div>
  );
};

export default withAuth(AddTaskPage);
