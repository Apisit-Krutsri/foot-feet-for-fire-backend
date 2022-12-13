// activityRoutes
const express = require('express');
const { profile, information } = require('../controllers/profileController');

const router = express.Router();

//Profile Route
router.post('/profile', profile); //create profile
router.get('/information/:uuidprofile', information); //get profile information

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)
