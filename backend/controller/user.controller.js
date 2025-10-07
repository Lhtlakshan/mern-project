import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";

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
  const email = req.body.username;
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

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// export const googleLogin = async (req,res) => {
//   const token = req.body.token; // ID token

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload(); // contains email, name, picture

//     console.log("Google user: ", payload);

//     const user = User.findOne({email: payload.email});
//     if(user == null){
//       const newUser = new User({
//         name: payload.name,
//         email: payload.email,
//         password: token,
//         role: "user",
//         isEmailVerified: true
//       })

//       const response = await newUser.save();

//     }

//     res.json({
//       message: "Google login success",
//       user: {
//         id: payload.sub,
//         email: payload.email,
//         name: payload.name,
//         picture: payload.picture,
//       },
//     });
//   } catch (err) {
//     console.error("Google login error:", err);
//     res.status(500).json({ message: "Google login failed" });
//   }
// };

export const googleLogin = async (req, res) => {
  const accessToken = req.body.accessToken;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    
    console.log(response.data);
    const user = await User.findOne({
      email: response.data.email,
    });
    
    if (user.email == null) {
      const newUser = new User({
        email: response.data.email,
        name: response.data.name,
        role: "user",
        isEmailVerified: true,
        password: accessToken
      })

      newUser.save()

      const userData = {
        name: response.data.name,
        email: response.data.email,
        isEmailVerified: true,
        isDisabled: false,
        role: newUser.role,
      };

      const token = jwt.sign(userData, process.env.JWT_KEY);

      console.log(token);
      

      res.json({
        message: "Login successfull",
        token: token,
        user: userData,
      });
    } else {
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
    }
  } catch (err) {
    res.status(500).json({
      message: "Google login failed",
    });
  }
};
