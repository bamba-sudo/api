const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductsController');

// Get all products
router.get('/', controller.getAllProducts);

// Get a single product
router.get('/:id', controller.getProduct);

// Create a new product
router.post('/', controller.setProduct);

// Update a product
router.put('/:id', controller.updateProduct);

// Delete a product
router.delete('/:id', controller.deleteProduct);

module.exports = router;
