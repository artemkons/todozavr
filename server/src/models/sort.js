import mongoose from "mongoose";
import { Schema } from "mongoose";

export const sortSchema = new Schema({
  order: { type: Number, default: 0 },
  parameter: { type: String, default: "done" },
});

export default mongoose.model("Sort", sortSchema);
