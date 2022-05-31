const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// import person model
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  Person.find({}).then((result) => {
    res.send(`<p>Phonebook as info for ${result.length} people </p>` + date);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!number || !name) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  console.log(name, number);

  person
    .save()
    .then((result) => {
      res.json(result.toJSON());
    })
    .catch((error) => next(error));
});

// delete person
app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// update person
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

// unkown route handler
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// error handler using middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`listening on port ${PORT}`);
