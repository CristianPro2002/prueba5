const express = require('express');
const { getProducts,getProductsByCategory, getProduct, postProduct, deleteProduct, updateProduct } = require('../../controllers/product.controller.js');
const router = express.Router();
const upload = require('../../middleware/uploadImg.js')

router.get('/', getProducts);

router.get('/category/:id', getProductsByCategory);

router.get('/:id', getProduct);

router.post('/', postProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);

module.exports = router;