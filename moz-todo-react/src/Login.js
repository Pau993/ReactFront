import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar mensajes de error
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Para enviar cookies si es necesario
      });

      if (response.ok) {
        onLogin();
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Redirige a la ruta de registro
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error si lo hay */}
      <div className="input-container">
        <label htmlFor="username">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre de usuario"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
        />
      </div>n      <div className="button-container">
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <button className="register-button" onClick={handleRegister}>
          Registrarse
        </button>
      </div>
    </div>
  );
};
export default Login;