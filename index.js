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

server.get("/api/users", (req, res) => {
  res.json(users);
});

const port = 5000;
server.listen(port, () => console.log(`\n == api on port ${port} == \n`));
