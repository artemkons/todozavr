import mongoose from "mongoose";
import { Schema } from "mongoose";

export const todoSchema = new Schema({
  title: String,
  text: String,
  done: { type: Boolean, default: false },
  deadline: Date,
});

export default mongoose.model("Todo", todoSchema);
