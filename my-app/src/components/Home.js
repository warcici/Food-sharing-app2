import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/login');  // Redirige vers l'interface d'authentification
  };

  return (
    <div className="cards-container">
      <div className="card" onClick={handleCardClick}>
        <img src={process.env.PUBLIC_URL + '/images/Cuisine_Francaise.webp'} alt="Cuisine Française" />
        <div className="card-title">Cuisine Française</div>
      </div>
      <div className="card" onClick={handleCardClick}>
        <img src={process.env.PUBLIC_URL + '/images/Cuisine_Italienne.webp'} alt="Cuisine Italienne" />
        <div className="card-title">Cuisine Italienne</div>
      </div>
      <div className="card" onClick={handleCardClick}>
        <img src={process.env.PUBLIC_URL + '/images/Cuisine_Asiatique.webp'} alt="Cuisine Asiatique" />
        <div className="card-title">Cuisine Asiatique</div>
      </div>
      <div className="card" onClick={handleCardClick}>
        <img src={process.env.PUBLIC_URL + '/images/Cuisine_Mexicaine.webp'} alt="Cuisine Mexicaine" />
        <div className="card-title">Cuisine Mexicaine</div>
      </div>
      <div className="card" onClick={handleCardClick}>
        <img src={process.env.PUBLIC_URL + '/images/Cuisine_Orientale.webp'} alt="Cuisine Orientale" />
        <div className="card-title">Cuisine Orientale</div>
      </div>
    </div>
  );
};

export default Home;
