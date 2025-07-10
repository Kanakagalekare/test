const express = require("express");
const router = express.Router();
const { addProduct, getProducts, updateProduct, deleteProduct, addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/productController");

// inventory routes
router.post("/", addProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Wishlist routes
router.post("/wishlist/:userId/:productId", addToWishlist);
router.get("/wishlist/:userId", getWishlist);
router.delete("/wishlist/:userId/:productId", removeFromWishlist);

module.exports = router;
