// userRoutes
const express = require('express');
const { user } = require('../controllers/userController');

const router = express.Router();

//Signup Route
router.post('/user', user); //create user (signup)

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)
