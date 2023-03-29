const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: {
      type: String,
      required: true,
    },
    image: {
      // type: Buffer,
      // contentType:String
      type: String,
      // required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      // type: String,
      ref:'Category',
      // required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      defualt: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping:{
      type:Boolean
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;