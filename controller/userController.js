const Usermodel = require("../database/schema/userSchema");
const fs = require("fs");
const bcrypt = require("bcrypt");

//req body
//try usermodel create body
//send user id
//catch err
const createUser = async (req, res) => {
  const body = req.body;
  console.log(body);
  const password = body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const data = { ...body, password: hashedPassword };
  try {
    const user = await Usermodel.create(data);
    res.status(200).send(user._id);
  } catch (err) {
    res.status(500).send(err);
    // console.log(err);
  }
};

//requist response next
//body of requist
//find email of body from usermodel console.log
//if user responseiin statusiin 200t send user
// else res status send 404
const loginUser = async (req, res) => {
  const body = req.body;
  const user = await Usermodel.findOne({ email: body.email });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("user not found");
  }
};
//find by id from usermodel (id)
//if user send user
//else not found

const getUserbyId = async (req, res) => {
  const body = req.body;
  const user = await Usermodel.find({ email: body.email });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("user not found");
  }
};

//req body
//try if body id getuserbyid bodyid res
//else usermodel find
//send
//catch err send internal error

const getUsers = async (req, res) => {
  const body = req.body;
  try {
    if (body.id) {
      getUserbyId(body.id, res);
    } else {
      const users = await Usermodel.find();
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send("internal error");
  }
};

module.exports = { createUser, loginUser, getUsers, getUserbyId };

// const dislike = async (req, res) => {
//   const factId = req.params.factId;
//   const userId = req.params.userId;

//   try {
//     const fact = await Factmodel.findById(factId);

//     if (!fact) {
//       return res.status(404).json({ error: "Fact not found" });
//     }

//     // Check if the user has already disliked the fact
//     const updatedDislike = fact.dislike.includes(userId)
//       ? fact.dislike
//       : [...fact.dislike, userId];

//     // Check if the user has already liked the fact
//     const updatedLikes = fact.likes.filter((id) => id !== userId);

//     const updatedFact = await Factmodel.findByIdAndUpdate(
//       factId,
//       {
//         dislike: updatedDislike,
//         likes: updatedLikes
//       },
//       { new: true }
//     );
//     res.status(200).send(updatedFact);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
