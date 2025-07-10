const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {addToWishlist, getUserWishlist, removeFromWishlist} = require('../controllers/userController');


router.post("/register", registerUser);
router.post("/login", loginUser);


router.post('/wishlist/:userId', addToWishlist);
router.get('/wishlist/:userId', getUserWishlist);
router.delete('/wishlist/:userId/:productId', removeFromWishlist);


module.exports = router;
