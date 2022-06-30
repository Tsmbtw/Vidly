const { date } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const rentalsSchema = new mongoose.Schema({
  //_id: { type: String },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
        required: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
  },
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
      },
    }),
  },
  dateOut: { type: Date, default: Date.now },
  dateReturn: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model("Rental", rentalsSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(rental);
}
exports.Rental = Rental;
exports.validate = validateRental;
