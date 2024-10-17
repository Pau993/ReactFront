import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar mensajes de error
  const navigate = useNavigate();

const handleLogin = async () => {
  const response = await axios.post(
    'http://localhost:8080/auth/login',
    { username, password },
    { withCredentials: true } // Para enviar cookies si es necesario
  ).then((response) => {
    onLogin();
  }).catch((error) => {
    alert('Usuario o contraseña incorrectos');
  });
  
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