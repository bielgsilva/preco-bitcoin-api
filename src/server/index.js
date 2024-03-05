require("dotenv").config(); 
const express = require("express");
const cors = require("cors");

const health = require("../routes/health");
const userRoutes = require("../routes/index");

const app = express();

app.use(express.json());
app.use(cors());

//teste de rotas
app.use(health);

//rotas de usuarios
app.use(userRoutes);

app.listen(process.env.PORT || 3000);


