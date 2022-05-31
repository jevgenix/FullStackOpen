require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

console.log("connecting to", uri);

mongoose
  .connect(uri)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("error connection to MongoDB:", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name must have at least 3 characters"],
    required: [true, "Name is required"],
    unique: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{7,8}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minlength: [8, "Number must have at least 8 digits"],
    required: [true, "Number is required"],
    unique: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// export module
module.exports = mongoose.model("Phone", personSchema);
