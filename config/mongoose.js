const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://rifairizqi3:Ux8Uks8YpCl1O81f@cluster0.aptfhkp.mongodb.net/eduwork-mongoose?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "mongoose connection error")
);
connection.once("open", () => console.log("mongoose connection success"));
