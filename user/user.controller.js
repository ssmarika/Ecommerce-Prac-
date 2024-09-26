import express from "express";
import Yup from "yup";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import { userValidationSchema } from "./user.validation.js";
imp;

const router = express.Router();

// register user
router.post(
  "/user/register",
  async (req, res, next) => {
    //extract data from req.body
    const data = req.body;

    //validate data
    // imported the the validation schema

    try {
      // validate data
      const validateData = await userValidationSchemalidationSchema.validate(
        data
      );
      req.body = validateData;
    } catch (error) {
      //if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }

    // call next function

    next();
  },
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

export default router;
