import React, { useState } from 'react';
import './PostSignup.css'; // Assurez-vous que ce fichier existe maintenant
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostSignup = ({ userId }) => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelection = async (selectedRole) => {
    setRole(selectedRole); // Mettez à jour le rôle choisi

    try {
      // Envoyer le rôle choisi au backend
      const response = await axios.post('http://localhost:5000/api/choose-role', {
        userId,
        role: selectedRole, // Utiliser le rôle sélectionné
      }); // <--- Added closing bracket

      if (response.data) {
        alert('Rôle sélectionné avec succès, un email de vérification a été envoyé.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Erreur lors du choix du rôle:', error);
      alert(`Erreur lors du choix du rôle: ${error.message}`); // Display more informative error message
    }
  };

  return (
    <div className="post-signup-container">
      <div className="role-box" onClick={() => handleRoleSelection('chef')}>
        <h2>Je suis un Cuisinier</h2>
        {/* Ajoutez ici une image ou une icône pour les cuisiniers */}
      </div>
      <div className="role-box" onClick={() => handleRoleSelection('client')}>
        <h2>Je cherche un Cuisinier</h2>
        {/* Ajoutez ici une image ou une icône pour les clients */}
      </div>
    </div>
  );
};

export default PostSignup;