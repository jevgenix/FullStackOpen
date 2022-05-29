// require("dotenv").config();

const mongoose = require("mongoose");

const password = process.argv[2];

if (process.argv.length < 5) {
  console.log("You didn't provided all needed information");
  process.exit(1);
}

// const uri = process.env.MONGODB_URI;
const uri = `mongodb+srv://jevgenix:${password}@cluster0.byt4i.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose.connect(uri);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phone", phoneBookSchema);

const data = new Phonebook({
  name: process.argv[3],
  number: process.argv[4],
});

data.save().then((result) => {
  console.log("added", process.argv[3], process.argv[4]);
  mongoose.connection.close();
});

Phonebook.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((note) => {
    console.log(note.name, note.number);
  });
  mongoose.connection.close();
});
