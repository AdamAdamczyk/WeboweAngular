const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ObjectId } = mongoose.Types;
const app = express();

app.use(express.json());
app.use(cors());

const email = "adam@adamczyk.com";
const password = "zaq1@WSX";
const secret = "your_secret_key";


function createUserInDb() {
  console.log("Connected to MongoDB");

  bcrypt.hash(password, 10);

  User.findOne({ email }).then((user) => {
    if (!user) {
      bcrypt
        .hash(password, 10) // 10 is the saltRounds, increase it for more security but it will be slower
        .then((hashedPassword) => {
          User.create({ email, password: hashedPassword })
            .then(() => console.log("User created"))
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      console.log("User already exists");
    }
  });
}


// Połączenie z bazą danych MongoDB
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    createUserInDb();
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

  const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
  
  const FunctionalitySchema = new mongoose.Schema({
    title: String,
  });

// Definicja modelu Task
const TaskSchema = new mongoose.Schema({
  title: String,
  status: String,
  functionalityId: String,
});

const Functionality = mongoose.model("Functionality", FunctionalitySchema);
const Task = mongoose.model("Task", TaskSchema);
const User = mongoose.model("User", UserSchema);



// Dodanie nowego zadania
app.post('/tasks', (req, res) => {
  const { title, status, functionalityId } = req.body;

  const newTask = new Task({
    title,
    status,
    functionalityId
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
  Task.find()//wyszukanie wszystkich tasków z ID funkcjonalności
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

//////////////////////////////////////////////////////////////////

app.post('/functionality', (req, res) => {
  const { title } = req.body;

  const newFunctionality = new Functionality({
    title,
  });

  newFunctionality
    .save()
    .then(() => {
      res.status(201).json(newFunctionality);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create functionality' });
    });
});


app.get('/functionality', (req, res) => {
  Functionality.find()
    .then((functionalities) => {
      res.json(functionalities);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve functionalities' });
    });
});

app.put('/functionality/:id', (req, res) => {
  const functionalityId = req.params.id;
  const { title } = req.body;

  Functionality.findByIdAndUpdate(functionalityId, { title })
    .then((functionality) => {
      if (!functionality) {
        return res.status(404).json({ error: 'Functionality not found' });
      }
      res.json(functionality);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update functionality' });
    });
});

app.delete('/functionality/:id', (req, res) => {
  const functionalityId = req.params.id;

  Functionality.findByIdAndRemove(functionalityId)
    .then((functionality) => {
      if (!functionality) {
        return res.status(404).json({ error: 'Functionality not found' });
      }
      res.json({ message: 'Functionality deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete functionality' });
    });
});
