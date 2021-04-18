const Todos = require("../models/todo");

var root = {
  allTodos: async () => {
    return await Todos.find({});
  },
  todo: async ({ id }) => {
    return await Todos.findById(id);
  },
  addTodo: async ({ title, text }) => {
    const todo = new Todos({ title, text: text ? text : "" });
    return await todo.save();
  },
  deleteTodo: async ({ id }) => {
    return await Todos.findByIdAndDelete(id);
  },
  editTodo: async ({ id, title, text }) => {
    return await Todos.findByIdAndUpdate(id, { title, text }, { new: true });
  },
};

module.exports = root;
