const Joi = require("joi");
const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  //_id: { type: String },
  isGold: { type: Boolean, default: false },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const Customer = mongoose.model("Customer", customersSchema);

function customersValidate(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phone: Joi.string().min(3).max(20).required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = customersValidate;
