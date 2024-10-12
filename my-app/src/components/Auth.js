import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/apisignup', {
        username,
        email,
        password,
      });
      alert(response.data.message);
      clearFields();
    } catch (error) {
      setError(error.response.data.message);
      console.error('Erreur inscription :', error.response);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/apilogin', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        alert('Connexion réussie !');
        navigate('/');
      } else {
        setError(response.data.message || 'Erreur lors de la connexion');
      }

      clearFields();
    } catch (error) {
      setError(error.response.data.message);
      console.error('Erreur de connexion :', error.response);
    }
  };

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-container">
      {isSignUp ? (
        <form onSubmit={handleRegister}>
          <h2>Inscription</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse e-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          <button type="submit">S'inscrire</button>
          <p>
            Déjà inscrit ?{' '}
            <span onClick={() => setIsSignUp(false)}>Se connecter</span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Connexion</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse e-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          <button type="submit">Se connecter</button>
          <p>
            Pas encore inscrit ?{' '}
            <span onClick={() => setIsSignUp(true)}>S'inscrire</span>
          </p>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Auth;