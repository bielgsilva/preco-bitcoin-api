require("dotenv").config();

const app = require("./server/index");

app.listen(process.env.PORT || 3000);
