const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require("../controllers/authController");
const { admin } = require("../middleware/adminMiddleware");
const { protect } = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUser);

module.exports = router;

