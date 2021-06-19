import mongoose from "mongoose";
import { Schema } from "mongoose";

const sortSchema = new Schema({
  //   TODO: Подумать над дефолтами
  // (чтобы результат запроса можно было сразу подставлять в функцию сортировки)
  order: { type: Number, default: 0 },
  parameter: { type: String, default: "done" },
});

export default mongoose.model("Sort", sortSchema);
