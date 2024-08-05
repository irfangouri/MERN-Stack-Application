const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  description: {
    required: true,
    type: String,
  },
  isCompleted: {
    default: false,
    type: Boolean,
  },
  title: {
    index: true,
    required: true,
    type: String,
  },
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todos', todoSchema);

module.exports = Todo;
