const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
mongoose.connect("mongodb://localhost:27017/test", () =>
  console.log("connected")
);
var db = mongoose.connection;
var mainschema = new mongoose.Schema({
  acc: String,
  title: String,
  note: String,
  added: String,
});

var user_schema = new mongoose.Schema({
  name: String,
  password: String,
});

app.use(express.json());
app.use(cors());

var model_ = mongoose.model("Data", mainschema);
var users = mongoose.model("User", user_schema);

app.get("/", (req, res) => {});
app.post("/login", (req, res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  users.find({}, (err, users) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].name == name && users[i].password == pass) {
        res.send("Login successful");
        break;
      }
      if (i == users.length - 1) {
        res.send("Account not found");
      }
    }
    // users.map((e) => {
    //   if (pass == e.name && pass == e.password) {
    //     res.send("Login successful");
    //   } else {
    //     res.send("Account not found");
    //   }
    // });
  });
});
app.post("/insert", (req, res) => {
  var title = req.body.title;
  var note = req.body.note;
  var acc = req.body.acc;
  if (note == "") {
    note = "Empty";
  }
  var added = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  var newNote = model_.create({
    acc: acc,
    title: title,
    note: note,
    added: added,
  });
  var id = 0;

  res.send({ title: title, acc: acc, note: note, added: added, id: id });
});
app.post("/getnotes", (req, res) => {
  model_.find({ acc: req.body.noe }).then((users) => {
    res.send(users);
  });
});
app.post("/sign", (req, res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  // users.find({}, (err, users) => {
  //   users.map((e) => {
  //     if (e.name == name && e.pass == pass) {
  //       res.send("Account exists");
  //     } else {
  //       users.create({ name: name, password: pass });
  //     }
  //   });
  // });
  users.create({ name: name, password: pass });
});
app.post("/update", (req, res) => {
  var title = req.body.oldtitle;
  var note = req.body.oldnote;
  var added = req.body.oldadded;
  var newtitle = req.body.newtitle;
  var newnote = req.body.newnote;
  var updated = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

  var x = model_.updateOne(
    { title: title, note: note, added: added },
    {
      title: newtitle,
      note: newnote,
      added: updated,
    },
    (err, result) => {
      if (err) throw err;
    }
  );

  model_
    .findById({
      title: newtitle,
      note: newnote,
      added: updated,
    })
    .then((user) => console.log(user));
});
app.listen(6001);
