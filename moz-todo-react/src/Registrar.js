import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister = async () => {
    console.log("Datos enviados:", { username, email, password });
    if (!username || !email || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.'); // Redirige al login después del registro
        navigate('/login');
      } else {
        alert('Error al registrar usuario.');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Registrarse</h2>
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
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
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
      </div>
      <button className="login-button" onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );
};

export default Register;
