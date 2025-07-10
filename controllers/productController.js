const Product = require("../models/Product");
const User = require("../models/User");

exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  const user = await User.findById(userId);
  if (!user.wishlist.includes(productId)) user.wishlist.push(productId);
  await user.save();
  res.json(user.wishlist);
};

exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.params.userId).populate("wishlist");
  res.json(user.wishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  const user = await User.findById(userId);
  user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
  await user.save();
  res.json(user.wishlist);
};
