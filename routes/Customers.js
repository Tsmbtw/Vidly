const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");
const Joi = require("joi");

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort();
  res.send(customers);
});
router.get("/:id", async (req, res) => {
  const customers = await Customer.findById(req.params.id);

  if (!customers) return res.status(400).send("Not Found");

  res.send(customers);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
  });

  res.send(await customer.save());
});
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!customer) return res.status(404).send("Not Found");

  res.send(customer);
});
router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) return res.status(404).send("Not Found");

  res.send(customer);
});

module.exports = router;
