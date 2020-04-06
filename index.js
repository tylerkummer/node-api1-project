const express = require("express");

const server = express();

let users = [
  {
    id: 1,
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
];

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ api: "running..." });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  if (userInfo.name === null && userInfo.bio === null) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else if (userInfo) {
    users.push(req.body);
    res.status(201).json(users);
  } else if (!userInfo) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved." });
  } else {
    res.json(users);
  }
});

server.get("/api/users/:id", (req, res) => {
  const userInfo = req.body;
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  if (id != userInfo.id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!user) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved." });
  } else {
    res.json(user);
  }
});

server.delete("/api/users/:id", (req, res) => {
  const userInfo = req.body;
  const id = req.params.id;
  const user = users.filter((user) => user.id !== id);

  if (id != userInfo.id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!user) {
    res.status(500).json({ message: "The user could not be removed." });
  } else {
    res.json(user);
  }
});

server.put("/api/users/:id", (req, res) => {
  const userInfo = req.body;
  const id = req.params.id;
  const user = users.filter((user) => user.id !== id);

  if (id != userInfo.id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (userInfo.name === null && userInfo.bio === null) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else if (!user) {
    res.status(500).json({ message: "The user could not be removed." });
  } else if (user) {
    res.json(user);
  }
});

const port = 5000;
server.listen(port, () => console.log(`\n == api on port ${port} == \n`));
