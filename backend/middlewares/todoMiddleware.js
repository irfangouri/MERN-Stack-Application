const { verifyAccessToken } = require('../utils/helpers');
const Todo = require('../models/todo');

const todoMiddleware = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

module.exports = todoMiddleware;
