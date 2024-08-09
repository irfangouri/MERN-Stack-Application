const express = require('express');
const todoController = require('../controllers/todoController');

const todo = express.Router({ mergeParams: true });

todo.post('/', todoController.addTodo);
todo.get('/:todoId', todoController.getTodo);
todo.get('/', todoController.getAllTodo);
todo.patch('/:todoId', todoController.updateTodo);
todo.delete('/:todoId', todoController.deleteTodo);

module.exports = todo;
