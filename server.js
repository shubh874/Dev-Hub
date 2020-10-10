const express = require("express");
const connectDB = require("./config/db");

//conect db
connectDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.get("/", (req, res) => res.send("server started"));

app.listen(PORT, () => console.log("server is connected"));
