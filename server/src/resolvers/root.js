import Todos from "../models/todo";

var root = {
  allTodos: async () => {
    return await Todos.find({});
  },
  todo: async ({ id }) => {
    return await Todos.findById(id);
  },
  addTodo: async ({ title, text, deadline }) => {
    const todo = new Todos({ title, text: text ? text : "", deadline });
    return await todo.save();
  },
  deleteTodo: async ({ id }) => {
    return await Todos.findByIdAndDelete(id);
  },
  editTodo: async ({ id, title, text }) => {
    return await Todos.findByIdAndUpdate(id, { title, text }, { new: true });
  },
  doneTodo: async ({ id }) => {
    let todo = await Todos.findById(id);
    todo.done = !todo.done;
    return await todo.save();
  },
};

export default root;
