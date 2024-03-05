const express = require("express");
const userRoutes = express.Router();

const {
  createUser,
  checkEmail,
} = require("../controllers/usersControllers");


userRoutes.post("/users/check-email", checkEmail);
userRoutes.post("/new-user", createUser);


module.exports = userRoutes;

