import React from 'react';
import { mockTasks } from '../../app/api/mock-data';

const TasksList = () => {
  return (
    <div>
      <h2>Tasks List</h2>
      <ul>
        {mockTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;