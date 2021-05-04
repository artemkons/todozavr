import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema/schema";
import root from "./resolvers/root";

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

app.use("/", express.static("client/public"));

app.use(
  "/api",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost`);
});
