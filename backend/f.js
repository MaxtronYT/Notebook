const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

const schema = new mongoose.Schema({
  name: String,
  pass: String,
  age: Number,
});

module.exports = mongoose.model("User", schema);
