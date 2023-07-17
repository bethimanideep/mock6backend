const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/user.model");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const userExists = await UserModel.findOne({ email: payload.email });

    if (userExists && userExists.password === payload.password)
      return res.json({ message: "User exists" });
    else if (userExists && userExists.password !== payload.password)
      return res.json({ message: "Invalid password" });

    const user = new UserModel(payload);
    await user.save();
    res.json({ message: "Successfully Registered" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong" });
  }
});

module.exports = { userRouter };
