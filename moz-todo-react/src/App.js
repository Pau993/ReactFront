import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Registrar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null); // Estado para el token
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskIdComplete, setTaskIdComplete] = useState('');
  const [taskIdDelete, setTaskIdDelete] = useState('');
  const [action, setAction] = useState(''); // Estado para la acción seleccionada

  const apiUrl = 'http://localhost:8080/tasks';
  const logoutUrl = 'http://localhost:8080/auth/logout';

  // Verificar si hay un JWT almacenado en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      loadTasks(storedToken); // Cargar tareas si el token ya está presente
    }
  }, []);

  const loadTasks = async (token) => {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`, // Incluir JWT en el header
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  const handleLogin = (receivedToken) => {
    setToken(receivedToken);
    setIsAuthenticated(true);
    loadTasks(receivedToken); // Cargar tareas después del login
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
          'Authorization': `Bearer ${token}`, // Usar el token almacenado
        },
        body: JSON.stringify(taskData),
      });

      const task = await response.json();
      setTasks([...tasks, task]);
      setNewTask('');
      alert(`Tarea creada con éxito: ID ${task.id}`);
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
          'Authorization': `Bearer ${token}`, // Usar el token almacenado
        },
        body: JSON.stringify({ completed: true }),
      });

      alert(`Tarea con ID ${taskId} marcada como completada.`);
      loadTasks(token); // Volver a cargar las tareas
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
        headers: {
          'Authorization': `Bearer ${token}`, // Usar el token almacenado
        },
      });

      alert(`Tarea con ID ${taskId} eliminada.`);
      loadTasks(token); // Volver a cargar las tareas
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Usar el token almacenado
        },
      });

      if (response.ok) {
        alert('Sesión cerrada con éxito.');
        localStorage.removeItem('jwtToken'); // Eliminar el token JWT
        setToken(null);
        setIsAuthenticated(false);
      } else {
        alert('Error al cerrar sesión.');
      }
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  };

  const handleSelectChange = (e) => {
    setAction(e.target.value);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div>
          <h1>Administrador de Tareas</h1>
          <div className="caja">
            <div className="caja-body">
              <label htmlFor="actionSelect">Selecciona una acción:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  id="actionSelect"
                  value={action}
                  onChange={handleSelectChange}
                  className="form-control"
                >
                  <option value="">Selecciona una acción</option>
                  <option value="addTask">Agregar tarea</option>
                  <option value="viewTasks">Ver listado de tareas</option>
                  <option value="completeTask">Marcar tarea como completada</option>
                  <option value="deleteTask">Eliminar tarea</option>
                </select>
              </div>

              {action === 'addTask' && (
                <div className="input-container">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nueva tarea"
                  />
                  <button onClick={addTask}>Agregar tarea</button>
                </div>
              )}

              {action === 'viewTasks' && (
                <div>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(task => (
                      <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.description}</td>
                        <td>{task.completed ? 'Completada' : 'Pendiente'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}

              {action === 'completeTask' && (
                <div className="input-container">
                  <input
                    type="text"
                    value={taskIdComplete}
                    onChange={(e) => setTaskIdComplete(e.target.value)}
                    placeholder="ID de la tarea a completar"
                  />
                  <button onClick={completeTask}>Completar tarea</button>
                </div>
              )}

              {action === 'deleteTask' && (
                <div className="input-container">
                  <input
                    type="text"
                    value={taskIdDelete}
                    onChange={(e) => setTaskIdDelete(e.target.value)}
                    placeholder="ID de la tarea a eliminar"
                  />
                  <button onClick={deleteTask}>Eliminar tarea</button>
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={logout}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
