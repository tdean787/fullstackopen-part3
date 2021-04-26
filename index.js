const { request } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

let persons = [
  {
    id: 1,
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: 2,
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: 3,
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
  {
    name: "Taylor Dean",
    phone: "1234",
    id: 4,
  },
];

const setRandomID = () => {
  return Math.floor(Math.random() * 999999);
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;
  const person = persons.find((p) => p.id == id);

  console.log(person);

  if (person) {
    res.status(200).send(JSON.stringify(person));
  } else {
    res.status(404).end();
  }
});

app.use(express.json());

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(404).json({
      error: "Person's name is missing",
    });
  } else if (!body.phone) {
    return response.status(404).json({
      error: "Phone number is missing",
    });
  } else {
    const person = {
      content: body.content,
      name: body.name,
      phone: body.phone,
      id: setRandomID(),
      date: new Date(),
    };
    persons = persons.concat(person);
    response.json(person);
  }
});

app.get("/", (request, response) => {
  response.send("<h1>hello world </h1>");
});

app.get("/info", (req, res) => {
  res.send(
    `<div> Phonebook has info for ${
      persons.length
    } <p> ${new Date()} </p> </div>`
  );
});

const port = 3001;
app.listen(port);

console.log("running on " + port);
