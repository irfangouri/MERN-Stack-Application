const Todo = require('../models/todo');
const todoService = require('../services/todoService');

const addTodo = async (req, res) => {
  try {
    const todoData = req.body;

    const todo = await todoService.addTodo(todoData);
    if (todo?.error) {
      return res.status(400).json({
        error: todo.error,
      });
    }

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).send(
      `An error occurred while creating todo, Error: ${err}`
    );
  }
}

const getTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todos = await Todo.findById(todoId);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(
      `An error occurred while creating todo, Error: ${err}`
    );
  }
}

const getAllTodo = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(
      `An error occurred while creating todo, Error: ${err}`
    );
  }
}

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { description, isCompleted, title} = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId},
      { $set: { description, isCompleted, title } },
      { new: true, useFindAndModify: false },
    );

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).send(
      `An error occurred while creating todo, Error: ${err}`
    );
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: todoId });

    if (!todo) {
      return res.status(404).json({ msg: `Todo with id ${todoId} not found`});
    }

    res.send(204);
  } catch (err) {
    res.status(500).send(
      `An error occurred while creating todo, Error: ${err}`
    );
  }
}

module.exports = {
  addTodo,
  getTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
};
