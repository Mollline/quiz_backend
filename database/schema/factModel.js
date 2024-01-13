const { model, Schema } = require("mongoose");
const UserSchema = new Schema({
  factID: String,
  date: { type: Date, default: Date.now },
  userID: String,
  text: String,
  likes: [],
  dislike: [],
  title: String,
});
const Factmodel = model("posts", UserSchema);
module.exports = Factmodel;
