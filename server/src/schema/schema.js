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

  type Query {
    todo(id: ID!): Todo
    allTodos: [Todo!]!
    getSort: Sort!
  }

  type Mutation {
    addTodo(title: String!, text: String, deadline: String): Todo!
    deleteTodo(id: ID!): Todo
    editTodo(id: ID!, title: String!, text: String!, deadline: String): Todo!
    doneTodo(id: ID!): Todo! 
    setSort(order: Int, parameter: String): Sort!
    unchekAllChecked: Query
    deleteAllChecked: Query
  }
`);

export default schema;
