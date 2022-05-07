const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook as info for ${persons.length} people </p>` + date);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((p) => {
    return p.id === id;
  });
  if (person) {
    res.json(person);
  } else {
    console.log("NOT FOUND");
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const generateID = () => {
    const maxId =
      persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
    return maxId + 1;
  };

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  persons.map((person) => {
    if (person.name === person.name) {
      return res.status(400).json({
        error: "name is already in use, name must be unique",
      });
    }
  });

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`listening on port ${PORT}`);
