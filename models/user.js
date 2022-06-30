const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { boolean } = require("joi");

const usersSchema = new mongoose.Schema({
  //_id: { type: String },
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  isAdmin: { type: Boolean },
});
usersSchema.methods.generateAuth = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", usersSchema);
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(5).max(255),
    password: Joi.string().required().min(8).max(1024),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
