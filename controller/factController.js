const fs = require("fs");
const bcrypt = require("bcrypt");
const Factmodel = require("../database/schema/factModel");
const factRouter = require("../router/factRouter");

const createFact = async (req, res) => {
  const body = req.body;
  try {
    const fact = await Factmodel.create(body);
    res.status(200).send(fact);
  } catch (e) {
    console.log(e);
  }
};
const getFacts = async (req, res) => {
  try {
    const facts = await Factmodel.find();
    res.status(200).send(facts);
  } catch (e) {
    console.log(e);
  }
};
const getFactByID = async (req, res) => {
  const id = req.params.userId;
  console.log(id);
  try {
    const getById = await Factmodel.find({userID:id});
    if (!getById) {
      return res.status(404).send({ message: "Fact not found" });
    }
    res.status(200).send(getById);
  } catch (err) {
    console.log(err);
  }
};

const deleteFact = async (req, res) => {
  const id = req.params.factId;
  try {
    const deletedFact = await Factmodel.findByIdAndDelete(id);
    if (!deletedFact) {
      return res.status(404).send({ message: "Fact not found" });
    }
    res.status(200).send(deletedFact);
  } catch (e) {
    console.log(e);
  }
};
const updateFact = async (req, res) => {
  const factId = req.params.factId;
  const body = req.body;
  try {
    const updatedFact = await Factmodel.findByIdAndUpdate(factId, {
      title: body.title,
      text: body.text,
    });
    res.status(200).send(updatedFact);
  } catch (err) {
    console.log(err);
  }
};
const addlikes = async (req, res) => {
  const factId = req.params.factId;
  const userId = req.params.userId;

  try {
    const fact = await Factmodel.findById(factId);

    if (!fact) {
      return res.status(404).json({ error: "Fact not found" });
    }
    const updatedDislike = fact.dislike.filter((id) => id !== userId);
    const updatedLikes = fact.likes.includes(userId)
      ? fact.likes
      : [...fact.likes, userId];

    const updatedFact = await Factmodel.findByIdAndUpdate(
      factId,
      {
        likes: updatedLikes,
        dislike: updatedDislike,
      },
      { new: true }
    );
    res.status(200).send(updatedFact);
  } catch (err) {
    console.log(err); 
  }
};
const dislike = async (req, res) => {
  const factId = req.params.factId;
  const userId = req.params.userId;

  try {
    const fact = await Factmodel.findById(factId);

    if (!fact) {
      return res.status(404).json({ error: "Fact not found" });
    }
    const updatedDislike = fact.dislike.includes(userId)
      ? fact.dislike
      : [...fact.dislike, userId];
    const updatedLikes = fact.likes.filter((id) => id !== userId);

    const updatedFact = await Factmodel.findByIdAndUpdate(
      factId,
      {
        dislike: updatedDislike,
        likes: updatedLikes,
      },
      { new: true }
    );
    res.status(200).send(updatedFact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createFact,
  getFacts,
  deleteFact,
  getFactByID,
  updateFact,
  addlikes,
  dislike,
};
