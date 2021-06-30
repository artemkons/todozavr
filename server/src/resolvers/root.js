import Todos from "../models/todo";
import Sort from "../models/sort";
import User from "../models/user";

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
  editTodo: async ({ id, title, text, deadline }) => {
    return await Todos.findByIdAndUpdate(
      id,
      { title, text, deadline },
      { new: true }
    );
  },
  doneTodo: async ({ id }) => {
    let todo = await Todos.findById(id);
    todo.done = !todo.done;
    return await todo.save();
  },
  getSort: async () => {
    return await Sort.findOne();
  },
  setSort: async ({ order, parameter }) => {
    let sort = await Sort.findOne();
    sort.order = order != null ? order : sort.order;
    sort.parameter = parameter || sort.parameter;
    return await sort.save();
  },
  unchekAllChecked: async () => {
    return await Todos.updateMany({ done: true }, { done: false });
  },
  deleteAllChecked: async () => {
    return await Todos.deleteMany({ done: true });
  },
  registerUser: async ({ email, password }) => {
    const candidate = await User.findOne({ email });

    if (candidate) return new Error("Пользователь уже существует!");

    const user = new User({ email, password });
    return await user.save();
  },
  login: async ({ email, password }) => {
    const candidate = await User.findOne({ email });

    if (!candidate) return new Error("Пользователь не найден!");

    if (candidate.password === password) return candidate;

    return new Error("Неверный пароль пользователя!");
  },
};

export default root;
