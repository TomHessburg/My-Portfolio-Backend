const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Were good!");
});

server.listen(5000, () => {
  console.log("server listening on port 5000");
});
