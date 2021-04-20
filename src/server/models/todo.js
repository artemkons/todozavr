import mongoose from "mongoose";
import { Schema } from "mongoose";

const todoSchema = new Schema({
  title: String,
  text: String,
});

export default mongoose.model("Todo", todoSchema);
