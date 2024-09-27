import express from "express";
import Yup from "yup";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import {
  loginUserValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import validateReqBody from "../middleware/authentication.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// !register user
router.post(
  "/user/register",
  //validate the request body using middleware
  validateReqBody(userValidationSchema),

  async (req, res) => {
    //extract new user from req.body
    const newUser = req.body;

    //find user using email
    const user = await User.findOne({ email: newUser.email });

    //if user exists throw error
    if (user) {
      return res.status(409).send({ message: "Email already exists" });
    }

    //hash password
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

    newUser.password = hashedPassword;
    console.log(hashedPassword);

    // insert user
    await User.create(newUser);

    //send res
    return res.status(201).send("User registered successfully");
  }
);

// !LOGIN
router.post(
  "/user/login",
  //validate req body using the middleware
  validateReqBody(loginUserValidationSchema),

  async (req, res) => {
    //extract the login credentials from req.body
    const data = req.body;

    // find user using email
    const user = await User.findOne({ email: data.email });

    // if not throw error
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    // compare password using decrypt
    const plainPassword = data.password;
    const hashedPassword = user.password;
    const isPasswordMarch = await bcrypt.compare(plainPassword, hashedPassword);

    // if not password ,match, throw error
    if (!isPasswordMarch) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }
    //generate access token
    const payload = { email: user.email };
    const secretKey = "SECRETKEY";
    const token = jwt.sign(payload, secretKey);

    return res
      .status(200)
      .send({
        message: "Successful login",
        userDetail: user,
        accessToken: token,
      });
  }
);

export default router;
