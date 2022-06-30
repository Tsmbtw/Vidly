const express = require("express");
const config = require("config");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid Email or Password...");

  const token = user.generateAuth();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255),
    password: Joi.string().required().min(8).max(1024),
  });
  return schema.validate(req);
}

module.exports = router;
