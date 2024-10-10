import React from 'react'
import { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskDescription) return; // Evitar añadir tareas vacías
    addTask(taskDescription);
    setTaskDescription(''); // Limpiar el campo de entrada
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Nueva tarea"
        className='task-input'
      />
      <button type="submit" className='add-task-button'>Agregar tarea</button>
    </form>
  );
};

export default TaskForm;
