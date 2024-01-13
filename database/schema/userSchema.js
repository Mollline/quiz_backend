const { model, Schema } = require("mongoose");
const UserSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  age: Number,
});
const Usermodel = model("user", UserSchema);
module.exports = Usermodel;
//date:date
//userID:string
