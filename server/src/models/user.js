import mongoose from "mongoose";
import { Schema } from "mongoose";
import { sortSchema } from "./sort";
import { todoSchema } from "./todo";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sort: {
    type: sortSchema,
    default: {
      order: 0,
      parameter: "done",
    },
  },
  todos: [todoSchema],
});

export default mongoose.model("User", userSchema);
