const express = require('express');
const { getCategorys, getCategorysByMenu, getProductsByCategory, getCategory, postCategory, deleteCategory, updateCategory } = require('../../controllers/category.controller.js');
const upload = require('../../middleware/uploadImg.js')
const router = express.Router();

router.get('/', getCategorys);

router.get('/menu/:id', getCategorysByMenu);

router.get('/products/:id', getProductsByCategory);

router.get('/:id', getCategory);

router.post('/', postCategory);

router.delete('/:id', deleteCategory);

router.put('/:id', updateCategory);

module.exports = router;