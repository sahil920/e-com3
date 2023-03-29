const express = require("express");
const { getProducts, getProduct, createProduct, deleteProduct, updateProduct } = require("../controllers/productsController");
const { protect, issAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.route('/products').get(getProducts);
router.route('/products/:id').get(getProduct);
router.post("/create-product", protect , issAdmin, createProduct)
router.delete("/delete-product/:id", protect , issAdmin, deleteProduct)
router.put("/update-product/:id", protect , issAdmin, updateProduct)
module.exports = router;