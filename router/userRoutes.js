const { Router } = require("express");
const bcrypt = require("bcrypt");
const {
  createUser,
  loginUser,
  getUsers,
  getUserbyId
} = require("../controller/userController.js");
const Usermodel = require("../database/schema/userSchema.js");
const userrouter = Router();

//requist response next
//body of requist
//find email of body from usermodel console.log
//if user responseiin statusiin 404t send
// else next
const validateEmailAddress = async (req, res, next) => {
  const body = req.body;
  const user = await Usermodel.findOne({ email: body.email });
  if (user) {
    res.status(403).send("email has already taken");
  } else {
    next();
  }
};
const validatePassword = async (req, res, next) => {
  const body = req.body;
  const user = await Usermodel.findOne({ email: body.email });
  console.log(user)
  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(body.password, user.password);
    if (isPasswordCorrect) {
      next();
    } else {
      res.status(404).send("incorrect password");
    }
  } else {
    res.status(404).send("user not found");
  }
};
// const LoginForm = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // Call the validatePassword function on the server
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }), 
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // If login is successful, perform any necessary actions (e.g., redirect)
//       onLogin(data);
//     } else {
//       // If login fails, handle the error (e.g., display an error message)
//       console.error(data.message);
//     }
//   };
// }
userrouter.post("/signup",validateEmailAddress, createUser);
userrouter.post("/login",validatePassword, loginUser);
userrouter.put("/user", validateEmailAddress);
userrouter.get("/users", getUsers);
userrouter.get("/user", getUserbyId);
module.exports = userrouter;
[];

// if(body.Username==="" || body.email==="" || body.password ===""){
//     res.status(404).send('fillllll')
// }else{}
