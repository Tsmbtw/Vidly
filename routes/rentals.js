const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, validate } = require("../models/rental");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/VIDLY");
const Fawn = require("fawn");
Fawn.init("mongodb://127.0.0.1:27017/VIDLY");

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-dateOut");
  res.send(rental);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status("404").send("Customer Not Found...");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status("404").send("Movie Not Found...");

  let rental = new Rental({
    customer: {
      _id: req.body.customerId,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: req.body.movieId,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  // const result = await rental.save();
  // res.send(result);
  var task = Fawn.Task();
  try {
    task
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
    res.send(rental);
  } catch (ex) {
    res.status("500").send("Server Error...");
  }
});

module.exports = router;
