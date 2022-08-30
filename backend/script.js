const mongoose = require("mongoose");
const User = require("./f");
mongoose.connect("mongodb://localhost:27017/test");

async function func() {
  var user = await User.create({
    name: "Bhuvan",
    pass: "NotKnow",
    age: 40,
  });
  user.name = "Bhuvan3";
  await user.save();
  console.log(user);
}

func();
