// src/TaskItem.js
import React from 'react';

const TaskItem = ({ task, toggleTaskCompletion }) => {
  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.description}
      <button onClick={() => toggleTaskCompletion(task.id)}>
        {task.completed ? 'Desmarcar' : 'Completar'}
      </button>
    </li>
  );
};

export default TaskItem;
