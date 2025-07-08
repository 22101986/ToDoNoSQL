const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Middleware to check if the user is authenticated
router.use(auth);

// Register route
router.post('/', async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const task = new Task({
    title,
    description,
    owner: req.user.userId,
    assignedTo: assignedTo || req.user.userId,
  });
  await task.save();
  res.json(task);
});

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  const tasks = await Task.find({
    $or: [{ owner: req.user.userId }, { assignedTo: req.user.userId }],
  }).populate('assignedTo', 'username');
  res.json(tasks);
});

// Get a specific task by ID
router.patch('/:id/complete', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  if (String(task.assignedTo) !== req.user.userId && String(task.owner) !== req.user.userId)
    return res.status(403).json({ error: 'Non autorisé' });
  task.completed = true;
  await task.save();
  res.json(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  if (String(task.owner) !== req.user.userId)
    return res.status(403).json({ error: 'Seul le créateur peut supprimer' });
  await task.deleteOne();
  res.json({ message: 'Tâche supprimée' });
});

module.exports = router;