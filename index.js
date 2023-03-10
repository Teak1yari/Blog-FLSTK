import express from "express";
import mongoose from "mongoose";
import { registerValidator } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:1234@cluster0.pbo1xg1.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB Error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidator, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
