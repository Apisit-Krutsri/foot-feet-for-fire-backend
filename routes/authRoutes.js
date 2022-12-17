// userRoutes
const express = require('express');
const { auth } = require('../controllers/authController');

const router = express.Router();

//Signup Route
router.post('/login', auth); //signin (authorize)

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)
