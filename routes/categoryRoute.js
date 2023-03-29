const express = require("express");
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controllers/categoryController");
const{ issAdmin, protect } = require( "../middlewares/authMiddleware");
const router = express.Router();

router.post('/create-category',protect, issAdmin, createCategoryController )
router.put('/update-category/:id',protect, issAdmin, updateCategoryController )
router.get('/get-category', categoryController )
router.get('/single-category/:id', singleCategoryController)
router.delete("/delete-category/:id", deleteCategoryController )

module.exports = router;