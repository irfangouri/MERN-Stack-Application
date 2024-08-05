const express = require('express');
const todoController = require('../controllers/todo-controller');

const todo = express();

todo.post('/', todoController.addTodo);
todo.get('/', todoController.getTodo);
todo.put('/:todoId', todoController.updateTodo);
todo.delete('/:todoId', todoController.deleteTodo);

module.exports = todo;
