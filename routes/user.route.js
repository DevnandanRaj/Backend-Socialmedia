const express = require("express");
const userRouter = express.Router();
const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");;


userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        return res.status(400).send({ "msg": "User already registered" })
    }
    else {
        bcrypt.hash(password, 5, async function (error, hash) {
            const user = new UserModel({
                name, email, gender, password: hash
            });
            await user.save();
            res.status(200).send({ "msg": "User registerd" })
        });
    }
});


userRouter.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
          return res.status(200).send({"msg":"user not found"})
      }
      const isMatch = await bcrypt.compare(password, user.password);
      const token = jwt.sign({ userId: user._id }, "Dev", { expiresIn: "1h" });
      res.status(200).json({"msg":"logedin",token})
  } catch (error) {
    res.status(400).json({"msg":"somethig went wrong"})
  }
});


module.exports = userRouter;
