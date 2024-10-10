import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

const App = () => {
  const [tasks, setTask] = useState([]);

  const addTask = (taskDescription) => {
    const newTask = { id: Date.now(), description: taskDescription, completed: false };
    setTask([...tasks, newTask]);
  };


const toggleTaskCompletion = (taskId) => {
  const updateTasks = tasks.map((task) =>
    task.id === taskId ? {...task, completed: !task.completed } : task
  );
  setTask(updateTasks)
};

return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />
    </div>
  );
};

export default App;
