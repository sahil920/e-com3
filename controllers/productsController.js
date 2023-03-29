const Product = require("../models/ProductModel");

const asyncHandler = require("express-async-handler");
const products = require("../data/products");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // throw new Error("some error")
  res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: `Product Not Found` });
  }
});

const createProduct = async (req, res) => {
  try {
    const product = req.body
    const {
      name,
      // image,
      brand,
      category,
      description,
      price,
      shipping,
      countInStock,
    } = product
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      // case !image:
      //   return res.status(500).send({ error: "image is Required" });
      case !brand:
        return res.status(500).send({ error: "brand is Required" });
      // case !category:
      //   return res.status(500).send({ error: "category is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !shipping:
        return res.status(500).send({ error: "shipping is Required" });
      case !countInStock:
        return res.status(500).send({ error: "countInStock is Required" });
    }
    const products = new Product({ ...req.body });
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating products",
    });
  }
};
const deleteProduct = async(req, res) =>{
  try {
       await Product.findByIdAndDelete(req.params.id)
    res.status(200).send({
      success:true,
      message:"Product Deleted Successfully",
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting products",
    })
  }
}
const updateProduct = async(req, res) =>{
  try {
    const product = await Product.findById(req.params.id, {new:true});
    
    if (product) {
      product.name = req.body.name ||product.name;
      product.brand= req.body.brand || product.brand;
      product.description= req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.shipping = req.body.shipping || product.shipping;
      product.countInStock = req.body.countInStock || product.countInStock;
       await product.save();
    } else {
      res.status(404);
      throw new Error("Product Not Found!");
    }
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating products",
    })
  }
}

module.exports = { getProducts, getProduct, createProduct, deleteProduct, updateProduct};
