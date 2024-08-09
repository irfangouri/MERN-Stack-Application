const todoService = require('../services/todoService');

const addTodo = async (req, res) => {
  try {
    const { userId } = req.params;
    const todoData = req.body;

    const todo = await todoService.addTodo(todoData, userId);
    if (todo?.error) {
      return res.status(403).json({
        error: todo.error,
      });
    }

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).send(
      `Error: ${err}`,
    );
  }
}

const getTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await todoService.getTodo(todoId);
    if (todo?.error) {
      return res.status(404).json({
        error: `Todo with id ${todoId} not found`
      });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).send(
      `Error: ${err}`,
    );
  }
}

const getAllTodo = async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await todoService.getAllTodos(userId);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(
      `Error: ${err}`,
    );
  }
}

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todoData = req.body;

    const updatedTodo = await todoService.updateTodo(todoId, todoData);
    if (updatedTodo?.error) {
      return res.status(404).json({
        error: `Todo with id ${todoId} not found`
      });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).send(
      `Error: ${err}`,
    );
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await todoService.deleteTodo(todoId);
    if (todo?.error) {
      return res.status(404).json({
        error: `Todo with id ${todoId} not found`
      });
    }

    res.send(204);
  } catch (err) {
    res.status(500).send(
      `Error: ${err}`,
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
