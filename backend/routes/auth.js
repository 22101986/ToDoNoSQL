const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check if the user is authenticated
//Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) return res.status(400).json({ error: 'Utilisateur déjà existant' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: 'Inscription réussie' });
});
// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, username });
});

module.exports = router;