const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Definicja modelu Task
const TaskSchema = new mongoose.Schema({
  title: String,
  status: String,
});

const Task = mongoose.model('Task', TaskSchema);

// Dodanie nowego zadania
app.post('/tasks', (req, res) => {
  const { title, status } = req.body;

  const newTask = new Task({
    title,
    status,
  });

  newTask.save()
    .then(() => {
      res.status(201).json(newTask);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create task' });
    });
});

// Pobranie wszystkich zadań
app.get('/tasks', (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    });
});

// Aktualizacja zadania
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, status } = req.body;

  Task.findByIdAndUpdate(taskId, { title, status })
    .then((task) => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update task' });
    });
});

// Usunięcie zadania
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndRemove(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete task' });
    });
});

// Nasłuchiwanie na określonym porcie
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});