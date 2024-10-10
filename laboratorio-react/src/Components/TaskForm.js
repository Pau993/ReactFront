import React from 'react'
import { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskDescription) return; // Evitar añadir tareas vacías
    addTask(taskDescription);
    setTaskDescription(''); // Limpiar el campo de entrada
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Agregar tarea</button>
    </form>
  );
};

export default TaskForm;
