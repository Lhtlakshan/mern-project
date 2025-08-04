import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
export const saveUser = (req, res) => {
  if (req.body.role == "admin") {
    if (req.user == null) {
      res.status(403).json({
        message: "Please login as an admin to create an admin user",
      });
    }

    if (req.user.role != "admin") {
      res.status(403).json({
        message: "Admin can only create admin users",
      });
    }
  }
  const bcryptPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcryptPassword,
    address: req.body.address,
    role: req.body.role,
  });

  user
    .save()
    .then(() => {
      res.status(200).json({
        message: "user saved",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "user was not saved",
      });
    });
};

export const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: email,
  }).then((user) => {
    if (user != null) {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {
        const userData = {
          name: user.name,
          email: user.email,
          address: user.address,
          isEmailVerified: user.isEmailVerified,
          isDisabled: user.isDisabled,
          role: user.role,
        };

        const token = jwt.sign(userData, process.env.JWT_KEY);

        res.json({
          message: "Login successfull",
          token: token,
          user: userData,
        });
      } else {
        res.status(403).json({
          message: "Invalid password",
        });
      }
    } else {
      res.json({
        message: "Invalid email",
      });
    }
  });
};

//  const email = req.body.username;
//     const password = req.body.password;

//     User.findOne({
//         email: email
//     }).then((user)=>{
//         if(user == null){
//             res.status(400).json({
//                 message: "Invalid email"
//             })
//         }else{
//             isPasswordCorrect = bcrypt.compareSync(password , user.password);
//             if(isPasswordCorrect){
//                 const userData = {
//                     name :user.name,
//                     email :user.email,
//                     password :user.password,
//                     address : user.address,
//                     role : user.role
//                 }

//                 const token = jwt.sign(userData , "random1234");

//                 res.json({
//                     message: "Login successfull",
//                     token : token
//                 })
//             }else{
//                 res.json({
//                   message: "Invalid password",
//                 });
//             }
//         }
//     })
