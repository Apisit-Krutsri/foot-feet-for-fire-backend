// profileRoutes
const express = require('express');
const {
  profile,
  information,
  editProfile,
} = require('../controllers/profileController');

const router = express.Router();

//Profile Route
router.post('/profile', profile); //create profile
router.get('/information/:id', information); //get profile information
router.put('/information/:id', editProfile); // edit profile

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)
