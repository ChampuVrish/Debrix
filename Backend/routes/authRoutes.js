const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser,verifyOtp } = require("../controllers/authController");
const { admin } = require("../middleware/adminMiddleware");
const { protect } = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/verify-email", verifyOtp);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUser);

module.exports = router;

