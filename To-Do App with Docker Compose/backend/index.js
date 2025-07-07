const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const TodoSchema = new mongoose.Schema({
    task: String,
    done: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

// Routes
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
