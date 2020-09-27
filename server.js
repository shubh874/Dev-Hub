const express = require("express");
const db = require("./mongodb/db");

const app = express();
const PORT = process.env.PORT || 5000;
db();

app.get("/", (req, res) => res.send("server started"));

app.listen(PORT, () => console.log("server is connected"));
