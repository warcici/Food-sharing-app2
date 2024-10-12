const express = require('express');
const { signup, chooseRole, verifyEmail, login } = require('../controllers/userController');

const router = express.Router();

// Route pour s'inscrire
router.post('/signup', signup);

// Route pour choisir le rôle
router.post('/choose-role', chooseRole);

// Route pour vérifier l'email
router.get('/verify-email', verifyEmail);

// Route pour login
router.post('/login', login);

module.exports = router;
