const productController = require("../controllers/productController.js");
const express = require("express");

// router
const router = express.Router();

router.post(
  "/addProduct",
  productController.uploadProductPhoto,
  productController.resizeProductPhoto,
  productController.addProduct
);

router.get("/allProducts", productController.getAllProducts);

router.get("/published", productController.getPublishedProduct);

// Products router
router.get("/:id", productController.getOneProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

// get product Reviews
router.get("/getProductReviews/:id", productController.getProductReviews);

module.exports = router;
