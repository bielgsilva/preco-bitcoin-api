const express = require("express");
const userRoutes = express.Router();

const { newUser, checkEmail } = require("../controllers/usersControllers");


userRoutes.get("/new-user", newUser);
userRoutes.get("/check-email", checkEmail);


module.exports = userRoutes;

