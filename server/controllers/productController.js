const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Check if Database is connected
    if (require('mongoose').connection.readyState !== 1) {
      console.warn('⚠️ MongoDB disconnected. Using Mock Products list.');
      return res.json(require('../data/mockProducts'));
    }

    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    // Check if Database is connected
    if (require('mongoose').connection.readyState !== 1) {
      console.warn('⚠️ MongoDB disconnected. Using Mock Product detail.');
      const mockProducts = require('../data/mockProducts');
      const product = mockProducts.find(p => p._id === req.params.id);
      if (product) {
        return res.json(product);
      } else {
        return res.status(404).json({ message: 'Product not found (Mock Mode)' });
      }
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, brand, price, originalPrice, image, category, description, countInStock, specs } = req.body;

  try {
    const product = new Product({
      name,
      brand,
      price,
      originalPrice,
      image,
      category,
      description,
      countInStock,
      specs,
      rating: 0,
      numReviews: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct };
