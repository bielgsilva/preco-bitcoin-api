const express = require("express");
const userRoutes = express.Router();

const { newUser } = require("../controllers/usersControllers");


userRoutes.post("/new-user", newUser);


module.exports = userRoutes;

