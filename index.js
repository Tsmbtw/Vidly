const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/VIDLY")
  .then(() => {
    console.log("connected to MongoDB...");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB...", e);
  });

const config = require("config");
const express = require("express");
const Joi = require("joi");
const genres = require("./routes/genres");
const customers = require("./routes/Customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
if (!config.get("jwtPrivateKey")) {
  console.log("Error");
  process.exit(1);
}
app = express();
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to port ${port} ...`));
