const express = require("express");
const {authController, getUserProfile, registerUser, updateUserProfile, testController} =  require("../controllers/usersController")
const router = express.Router();
const {protect, issAdmin} = require("../middlewares/authMiddleware")

//user registration
router.route("/").post(registerUser);

router.post('/login', authController);

router.route('/profile', authController).get(protect,getUserProfile).put(protect, updateUserProfile)
// router.post("/test",  issAdmin, authController)
router.get("/test",protect, issAdmin , testController)
module.exports = router;