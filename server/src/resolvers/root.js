import Todos from "../models/todo";
import Sort from "../models/sort";
import User from "../models/user";

var root = {
  allTodos: async ({ userId }) => {
    const user = await User.findById(userId);
    return user.todos || [];
  },
  todo: async ({ userId, todoId }) => {
    const user = await User.findById(userId);
    let todo = user.todos.id(todoId);
    return await todo;
  },
  addTodo: async ({ userId, title, text, deadline }) => {
    const user = await User.findById(userId);
    let newTodo = new Todos({ title, text: text ? text : "", deadline });
    user.todos.push(newTodo);
    await user.save();
    return newTodo;
  },
  deleteTodo: async ({ userId, todoId }) => {
    const user = await User.findById(userId);
    let deletedTodo = user.todos.id(todoId);
    deletedTodo.remove();
    await user.save();
    return deletedTodo;
  },
  editTodo: async ({ userId, todoId, title, text, deadline }) => {
    const user = await User.findById(userId);
    let todoForEdit = user.todos.id(todoId);
    todoForEdit.set({
      ...todoForEdit,
      title,
      text,
      deadline,
    });
    await user.save();
    return todoForEdit;
  },
  doneTodo: async ({ userId, todoId }) => {
    const user = await User.findById(userId);
    let todoForDone = user.todos.id(todoId);
    todoForDone.set({
      done: !todoForDone.done,
    });
    await user.save();
    return todoForDone;
  },
  getSort: async ({ userId }) => {
    const user = await User.findById(userId);
    return user.sort;
  },
  setSort: async ({ userId, order, parameter }) => {
    const user = await User.findById(userId);
    let sort = user.sort;
    sort.set({
      ...(order && { order }),
      ...(parameter && { parameter }),
    });
    user.save();
    return sort;
  },
  unchekAllChecked: async ({ userId }) => {
    const user = await User.findById(userId);
    const newTodos = user.todos.map((todo) => {
      if (todo.done) todo.done = false;
      return todo;
    });
    user.todos = newTodos;
    await user.save();
    return newTodos;
  },
  deleteAllChecked: async ({ userId }) => {
    const user = await User.findById(userId);
    const newTodos = user.todos.filter((todo) => !todo.done);
    user.todos = newTodos;
    await user.save();
    return newTodos;
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
