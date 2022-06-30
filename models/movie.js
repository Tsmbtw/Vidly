const mongoose = require("mongoose");
const { genresSchema } = require("./genre");
const Joi = require("joi");

const moviesSchema = new mongoose.Schema({
  //_id: { type: String },
  title: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  genre: {
    type: genresSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});
const Movie = mongoose.model("Movie", moviesSchema);

function moviesValidate(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.required(),
    numberInStock: Joi.number().min(0).max(255),
    dailyRentalRate: Joi.number().min(0).max(255),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = moviesValidate;
