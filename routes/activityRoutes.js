// activityRoutes
const express = require('express');
const {
  create,
  getAllCards,
  remove,
  update,
} = require('../controllers/activityController');

const router = express.Router();

//Activity Route
router.post('/create', create); //create (post)
router.get('/cards', getAllCards); // get cards to UI
router.delete('/card/:uuid', remove); //delete
router.put('/card/:uuid', update); //update

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)