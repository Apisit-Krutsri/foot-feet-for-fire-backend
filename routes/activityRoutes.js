// activityRoutes
const express = require('express');

const router = express.Router();
const { create } = require('../controllers/activityController');

//route
router.post('/activity', create);

module.exports = router;


//app.js -> server.js -> routes -> controller (เรียกใช้จาก func create)
