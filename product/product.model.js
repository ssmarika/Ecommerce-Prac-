import mongoose from "mongoose";
import { productCategories } from "../constant/general.constant.js";
//set schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 55 },
  brand: { type: String, required: true, trim: true, maxlehgth: 55 },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, min: 1, required: true },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: productCategories,
  },
  freeShipping: { type: Boolean, required: false, default: false },
  sellerId: { type: mongoose.ObjectId, required: true, ref: "User" },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 100,
  },
  image: { type: String, required: false, defaukt: null },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
