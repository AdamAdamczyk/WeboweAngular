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

// Nasłuchiwanie na określonym porcie
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
