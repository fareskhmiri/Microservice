const express = require("express");
const Messages = require("../models/messages");
const router = express.Router();

router.get("/new", (req, res) => {
  res.json("saved");
});

router.post("/new", async (req, res, next) => {
  let messages = new Messages({
    message: req.body.message,
    recipient: req.body.recipient,
    sender: req.body.sender,
  });
  try {
    messages = await messages.save();
    console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500);
  }
});

router.get("/all", async (req, res) => {
  let messages = await Messages.find();
  console.log(messages);
  if (messages == null) res.status(500);
  else res.status(200).json(messages);
});

router.get("/:id", async (req, res) => {
  let messages = await Messages.findOne({ id: req.params.id });
  if (messages == null) res.status(500);
  else res.status(200).json(messages);
});

router.post("/:id/edit", async (req, res) => {
  let messages = {};
  messages = {
    message: req.body.message,
    recipient: req.body.recipient,
    sender: req.body.sender,
    updateDate: new Date(),
  };
  try {
    await Messages.updateOne({ id: req.params.id }, messages);
    res.status(200).send(messages);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let messages = await Messages.findOneAndDelete({ id: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

module.exports = router;
