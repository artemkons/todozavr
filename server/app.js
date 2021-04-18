const express = require("express");
var { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const root = require("./resolvers/root")


const URL =
  "mongodb+srv://artemkons:123@cluster0.9mla7.mongodb.net/todos_db?retryWrites=true&w=majority";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/api",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}/api`);
});
