const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect("mongodb://localhost:27017/Accs");
app.get("/", (req, res) => {
  res.send("<a href='https://youtube.com'>F</a>");
  const model = mongoose.model("Users", { name: String });
  const Data = new model({ name: "Bhuvan" });
});

app.listen(6001);
