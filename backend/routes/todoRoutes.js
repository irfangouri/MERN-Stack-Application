const express = require('express');
const todoController = require('../controllers/todoController');
const todoMiddleware = require('../middlewares/todoMiddleware');

const todo = express.Router({ mergeParams: true });

todo.post('/', todoController.addTodo);
todo.get('/:todoId', todoMiddleware, todoController.getTodoById);
todo.get('/', todoController.getAllTodos);
todo.patch('/:todoId', todoMiddleware, todoController.updateTodoById);
todo.delete('/:todoId', todoMiddleware, todoController.deleteTodoById);

module.exports = todo;
