// activityRoutes
const express = require('express');
const { create } = require('../controllers/activityController');

const router = express.Router();

//route
router.post('/create', create); //create (post)

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)
