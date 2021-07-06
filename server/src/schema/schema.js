import { buildSchema } from "graphql";

var schema = buildSchema(`
  type Todo {
    id:ID!
    title: String!
    text: String!
    done: Boolean!
    deadline: String
  }

  type Sort {
    id: ID!
    order: Int!,
    parameter: String!
  }

  type User {
    id:ID!
    email: String!
    password: String!
    sort: Sort!
    todos: [Todo!]
  }

  type Query {
    todo(userId: ID!, todoId: ID!): Todo
    allTodos(userId: ID!): [Todo]
    getSort(userId: ID!): Sort!
    login(email: String!, password: String!) : User
  }

  type Mutation {
    addTodo(userId: ID!, title: String!, text: String, deadline: String): Todo!
    deleteTodo(userId: ID!, todoId: ID!): Todo
    editTodo(userId: ID!, todoId: ID!, title: String!, text: String!, deadline: String): Todo!
    doneTodo(userId: ID!, todoId: ID!): Todo! 
    setSort(userId: ID!, order: Int, parameter: String): Sort!
    unchekAllChecked(userId: ID!): Query
    deleteAllChecked(userId: ID!): Query
    registerUser(email: String!, password: String!) : User
  }
`);

export default schema;
