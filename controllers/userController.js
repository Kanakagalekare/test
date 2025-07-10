const User = require("../models/User");
const Product = require('../models/Product');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(201).json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

//user login credential
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
};


// Add wishlist
const addToWishlist = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  const user = await User.findById(userId);
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  res.json({ message: 'Added to wishlist' });
};

// Get wishlist
const getUserWishlist = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate('wishlist');
  res.json(user.wishlist);
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  const user = await User.findById(userId);
  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== productId
  );
  await user.save();

  res.json({ message: 'Removed from wishlist' });
};

module.exports = {
  registerUser,
  loginUser,
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
};
