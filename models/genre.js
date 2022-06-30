const mongoose = require("mongoose");
const Joi = require("joi");
const genresSchema = new mongoose.Schema({
  //_id: { type: String },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  date: { type: Date, default: Date.now },
});
const Genre = mongoose.model("Genre", genresSchema);

function genresValidate(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}
exports.Genre = Genre;
exports.validate = genresValidate;
exports.genresSchema = genresSchema;
