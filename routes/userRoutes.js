// userRoutes
const express = require('express');
const { user, getUser, editUser } = require('../controllers/userController');

const router = express.Router();

//Signup Route
router.post('/user', user); //create user (signup)
router.get('/edit/:id', getUser); //get user's email and password
router.put('/edit/:id', editUser); //edit user account

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)
