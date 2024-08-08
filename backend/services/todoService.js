const Todo = require('../models/todo');
const { validateTodo } = require('../validations/todoValidation');

const addTodo = async (todoData) => {
  const todoValidation = validateTodo(todoData);
  if (todoValidation?.error) {
    return {
      error: todoValidation.error,
    };
  }

  const todo = new Todo({
    title: todoData.title,
    description: todoData.description,
    status: todoData.status,
    createdBy: todoData.createdBy,
    dueDate: todoData.dueDate,
    priority: todoData.priority,
  });

  await todo.save();
  return todo;
}

const getAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
}

module.exports = {
  addTodo,
  getAllTodos,
  
};
