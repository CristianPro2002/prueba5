const express = require('express');
const { getPlaces, getPlacesByUser, getPlace, postPlace, updateTheme, deletePlace, updatePlace, updateDefaultLang } = require('../../controllers/place.controller.js');
const router = express.Router();
const upload = require('../../middleware/uploadImg.js')

router.get('/', getPlaces);

router.get('/user/:id', getPlacesByUser);

router.get('/:id', getPlace);

router.post('/', postPlace);

router.put('/theme/:id', updateTheme);

router.delete('/:id', deletePlace);

router.put('/:id', updatePlace);

router.put('/default-lang/:id', updateDefaultLang);

module.exports = router;