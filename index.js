const express = require("express");
const app = express();
const AuthRoute = require("./routes/Authrouter");

require("dotenv").config();
const dbconnection = require("./db/Database");

const PORT = 7070;

// Middleware to parse JSON data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home");
});

// middleware
app.use("/auth/api", AuthRoute);

app.listen(PORT, () => {
  console.log(`conneted to ${PORT}  `);
});
