const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyToken, verifyAdmin } = require("../middleware.js/auth.middleware");

router.get("/", productController.getProducts);
router.post("/", verifyToken, verifyAdmin, productController.createProduct);
router.patch("/:id", verifyToken, verifyAdmin, productController.updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, productController.deleteProduct);

module.exports = router;