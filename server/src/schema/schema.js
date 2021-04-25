import { buildSchema } from "graphql";

var schema = buildSchema(`
  type Todo {
    id:ID!
    title: String!
    text: String!
  }

  type Query {
    todo(id: ID!): Todo
    allTodos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!, text: String): Todo!
    deleteTodo(id: ID!): Todo!
    editTodo(id: ID!, title: String!, text: String!): Todo! 
  }
`);

export default schema;
