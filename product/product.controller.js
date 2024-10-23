import express from "express";
import Product from "./product.model.js";
import { isSeller, isUser } from "../middleware/authentication.middleware.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { addProductValidationSchema } from "./product.validation.js";

const router = express.Router();

//! LIST ALL PRODUCTS
router.get("/product/list", isUser, async (req, res) => {
  //find all products

  const products = await Product.find();

  //send response
  return res.status(200).send({ message: "Success", Product: products });
});

//! ADD PRODUCT
router.post(
  "/product/add",
  isUser,
  isSeller,
  validateReqBody(addProductValidationSchema),
  async (req, res) => {
    //extract new product from req.body
    const newProduct = req.body;

    newProduct.sellerId = req.loggedInUserId;

    // save product
    await Product.create(newProduct);

    //
    return res.status(201).send({ message: "Product added successfully" });
  }
);

export default router;
