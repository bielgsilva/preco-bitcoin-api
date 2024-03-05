const express = require("express");
const userRoutes = express.Router();

const {
  newUser,
  checkEmail,
} = require("../controllers/usersControllers");


// userRoutes.post("/users/check-email", checkEmail);
userRoutes.post("/new-user", newUser);


module.exports = userRoutes;

