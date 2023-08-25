const express = require('express');
const { getSubcategorys, getProductsBySubcategory, getSubcategory, postSubcategory,addProduct, deleteSubcategory, updateSubcategory } = require('../../controllers/subcategory.controller.js');
const router = express.Router();

router.get('/', getSubcategorys);

router.get('/:id', getSubcategory);

router.get('/products/:id', getProductsBySubcategory)

router.post('/:id', postSubcategory);

router.post('/add_product/:id', addProduct)

router.delete('/:id', deleteSubcategory);

router.put('/:id', updateSubcategory);

module.exports = router;