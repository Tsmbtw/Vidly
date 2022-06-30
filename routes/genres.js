const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const Joi = require("joi");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort();
  res.send(genres);
});
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(400).send("Not Found");

  res.send(genre);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  res.send(await genre.save());
});
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!genre) return res.status(404).send("Not Found");

  res.send(genre);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("Not Found");

  res.send(genre);
});

module.exports = router;
