import React, { useState, useEffect } from 'react';
import './App.css'
import Login from './Login';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [action, setAction] = useState('Agregar tarea');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskIdComplete, setTaskIdComplete] = useState('');
  const [taskIdDelete, setTaskIdDelete] = useState('');

  const apiUrl = 'http://localhost:8080/tasks';
  const logoutUrl = 'http://localhost:8080/auth/logout';

  useEffect(() => {
    if (action === 'viewTasks') {
      loadTasks();
    }
  }, [action]);

  const loadTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') {
      alert('La descripción de la tarea no puede estar vacía.');
      return;
    }

    const taskData = {
      description: newTask,
      completed: false,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const task = await response.json();
      setTasks([...tasks, task]);
      alert(`Tarea creada con éxito: ID ${task.id}`);
      setNewTask(''); // Limpiar el input
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const completeTask = async () => {
    const taskId = parseInt(taskIdComplete.trim());
    if (isNaN(taskId)) {
      alert('Debes ingresar un ID válido.');
      return;
    }

    try {
      await fetch(`${apiUrl}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });

      alert(`Tarea con ID ${taskId} marcada como completada.`);
      loadTasks();
    } catch (error) {
      console.error('Error al completar la tarea:', error);
    }
  };

  const deleteTask = async () => {
    const taskId = parseInt(taskIdDelete.trim());
    if (isNaN(taskId)) {
      alert('Debes ingresar un ID válido.');
      return;
    }

    try {
      await fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE',
      });

      alert(`Tarea con ID ${taskId} eliminada.`);
      loadTasks();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleSelectChange = (e) => {
    setAction(e.target.value);
  };

  const handleAction = () => {
    switch (action) {
      case 'addTask':
        addTask();
        break;
      case 'completeTask':
        completeTask();
        break;
      case 'deleteTask':
        deleteTask();
        break;
      default:
        loadTasks();
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(logoutUrl, {
        method: 'POST',
        credentials: 'include', // Para incluir la cookie de sesión
      });

      if (response.ok) {
        alert('Sesión cerrada con éxito.');
        setIsAuthenticated(false); // Actualizar el estado para indicar que no está autenticado
      } else {
        alert('Error al cerrar sesión.');
      }
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div>
      <h1>Administrador de Tareas</h1>
      <div>
        <label htmlFor="actionSelect">Selecciona una acción:</label>
        <select id="actionSelect" value={action} onChange={handleSelectChange}>
          <option value="addTask">Agregar tarea</option>
          <option value="viewTasks">Ver listado de tareas</option>
          <option value="completeTask">Marcar tarea como completada</option>
          <option value="deleteTask">Eliminar tarea</option>
        </select>
        <button onClick={handleAction}>Aceptar</button>
      </div>

      {action === 'addTask' && (
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Agregar nueva tarea"
          />
          <button onClick={addTask}>Agregar</button>
        </div>
      )}

      {action === 'viewTasks' && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.description}</td>
                <td>{task.completed ? 'Completada' : 'Pendiente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {action === 'completeTask' && (
        <div>
          <input
            type="text"
            value={taskIdComplete}
            onChange={(e) => setTaskIdComplete(e.target.value)}
            placeholder="ID de la tarea"
          />
          <button onClick={completeTask}>Marcar como completada</button>
        </div>
      )}

      {action === 'deleteTask' && (
        <div>
          <input
            type="text"
            value={taskIdDelete}
            onChange={(e) => setTaskIdDelete(e.target.value)}
            placeholder="ID de la tarea"
          />
          <button onClick={deleteTask}>Eliminar tarea</button>
        </div>
      )}
      <div>
        <button onClick={logout} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default App;
