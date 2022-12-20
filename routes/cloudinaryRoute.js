// activityRoutes
const express = require('express');
const { addImage, getImage } = require('../controllers/cloudinaryController');

const router = express.Router();

//Cloudinary Route (for uploading images)
router.post('/images', addImage); //add image (post)
router.get('/images/:id', getImage); //getimage

module.exports = router;
