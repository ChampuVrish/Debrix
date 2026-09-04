const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productsController.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

const router = express.Router();
//All Products
router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProduct);
//Specific Product
router.route("/:id").get(getProductById).put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;

