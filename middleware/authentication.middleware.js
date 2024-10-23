import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const isUser = async (req, res, next) => {
  //extract token from req.headers

  //the token is extracted from the header which is available under authorization
  //console.log(req.headers);

  const { authorization } = req.headers;
  // this is the destructured form of const authorization= req.headers.authorization

  // all of this is basic, just done to extract the token only
  // if the token is not available then the server may crash so to prevent that we take some necessary steps

  const splittedArray = authorization?.split(" ");

  //console.log(splittedArray);

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  //console.log(token);

  // if not token throw error
  if (!token) {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  //payload is to be used outside the scope so we declare it outside
  let payload;
  // decrypt token
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    payload = jwt.verify(token, secretKey);
    //console.log(payload);
  } catch (error) {
    // if decryption fails, throw error
    return res.status(201).send({ message: "Unauthorized access" });
  }

  // find user using email from payload

  const user = await User.findOne({ email: payload.email });
  //console.log(user);

  // if not user, throw error
  if (!user) {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  // call next function
  next();
};

export const isSeller = async (req, res, next) => {
  //extract token from req.headers

  //the token is extracted from the header which is available under authorization
  //console.log(req.headers);

  const { authorization } = req.headers;
  // this is the destructured form of const authorization= req.headers.authorization

  // all of this is basic, just done to extract the token only
  // if the token is not available then the server may crash so to prevent that we take some necessary steps

  const splittedArray = authorization?.split(" ");

  //console.log(splittedArray);

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  //console.log(token);

  // if not token throw error
  if (!token) {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  //payload is to be used outside the scope so we declare it outside
  let payload;
  // decrypt token
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    payload = jwt.verify(token, secretKey);
    //console.log(payload);
  } catch (error) {
    // if decryption fails, throw error
    return res.status(201).send({ message: "Unauthorized access" });
  }

  // find user using email from payload

  const user = await User.findOne({ email: payload.email });
  //console.log(user);

  // if not user, throw error
  if (!user) {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  //check if seller
  if (user.role !== "seller") {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  req.loggedInUserId = user._id;
  // call next function
  next();
};

export const isBuyer = async (req, res, next) => {
  //extract token from req.headers

  //the token is extracted from the header which is available under authorization
  //console.log(req.headers);

  const { authorization } = req.headers;
  // this is the destructured form of const authorization= req.headers.authorization

  // all of this is basic, just done to extract the token only
  // if the token is not available then the server may crash so to prevent that we take some necessary steps

  const splittedArray = authorization?.split(" ");

  //console.log(splittedArray);

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  //console.log(token);

  // if not token throw error
  if (!token) {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  //payload is to be used outside the scope so we declare it outside
  let payload;
  // decrypt token
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    payload = jwt.verify(token, secretKey);
    console.log(payload);
  } catch (error) {
    // if decryption fails, throw error
    return res.status(201).send({ message: "Unauthorized access" });
  }

  // find user using email from payload

  const user = await User.findOne({ email: payload.email });
  //console.log(user);

  // if not user, throw error
  if (!user) {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  //check if buyer
  if (user.role !== "buyer") {
    return res.status(201).send({ message: "Unauthorized access" });
  }

  req.loggedInUserId = user._id;
  // call next function
  next();
};
