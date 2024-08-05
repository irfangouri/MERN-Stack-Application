const Todo = require('../models/todo');

const addTodo = (req, res, next) => {
  try {
    const { description, title } = req.body;

    const newTodo = new Todo({
      description,
      title,
    });
    newTodo.save();

    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
}

const getTodo = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
}

const updateTodo = async (req, res, next) => {
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
    next(err);
  }
}

const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: todoId });

    if (!todo) {
      return res.status(404).json({ msg: `Todo with id ${todoId} not found`});
    }

    res.send(204);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
