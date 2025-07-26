import express from "express";

import mongoose from "mongoose";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import verifyJwt from "./middleware/auth.js";
import orderRouter from "./routes/order.route.js";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express();
const port = 3000;
//middleware
app.use(cors())
app.use(express.json());

//middleware
app.use(verifyJwt);

//routes
app.use("/api/products", productRouter);

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

//query param

// app.get("/users/:userId/books/:bookId", (req, res) => {
//   res.send(req.params);
// });..

app.get(
  "/example/b",
  (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

mongoose
  .connect(process.env.MONGO_URL) //mongodb url from .env file
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`app is running the port number : ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
