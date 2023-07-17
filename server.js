const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

const email = "adam@adamczyk.com";
const password = "WeboweAngular";
const secret = "your_secret_key";

function createUserInDb() {
  console.log("Connected to MongoDB");

  User.findOne({ email }).then((user) => {
    if (!user) {
      bcrypt
        .hash(password, 10)
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ token: null, message: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, secret);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

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

const TaskSchema = new mongoose.Schema({
  title: String,
  status: String,
  functionalityId: String,
});

const Functionality = mongoose.model("Functionality", FunctionalitySchema);
const Task = mongoose.model("Task", TaskSchema);
const User = mongoose.model("User", UserSchema);

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

app.get('/tasks/:functionalityId', (req, res) => {
  const functionalityId = req.params.functionalityId;

  Task.find({ functionalityId: functionalityId }) 
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    });
});

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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
