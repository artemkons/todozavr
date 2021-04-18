const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: String,
  text: String,
});

module.exports = mongoose.model("Todo", todoSchema);
