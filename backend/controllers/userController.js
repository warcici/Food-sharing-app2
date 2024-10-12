const User = require('../Models/User');
const sendVerificationEmail = require('../email/emailVerification');
const jwt = require('jsonwebtoken');

// Inscription avec redirection vers la page de choix du rôle
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'Compte créé, veuillez choisir votre rôle.', userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du compte.', error });
  }
};

// Choix du rôle
exports.chooseRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

    user.role = role;
    await user.save();

    // Envoi de l'email de vérification après le choix du rôle
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await sendVerificationEmail(user.email, verificationLink);
    res.status(200).json({ message: 'Email de vérification envoyé.' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors du choix du rôle.', error });
  }
};

// Vérification de l'email
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: 'Email vérifié avec succès.' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la vérification de l\'email.', error });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

    if (!user.isVerified) return res.status(400).json({ message: 'Veuillez vérifier votre email.' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la connexion.', error });
  }
};
