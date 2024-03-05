const express = require("express");
const health = express.Router();

health.get("/", (request, response) => {
  return response.json({ message: "Server is Running" });
});

module.exports = health;
