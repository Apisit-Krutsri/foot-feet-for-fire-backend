// activityRoutes
const express = require('express');
const {
  create,
  getAllCards,
  remove,
  update,
  getCard,
} = require('../controllers/activityController');

const router = express.Router();

//Activity Route
router.post('/create', create); //create (post)
router.get('/cards/:id', getAllCards); // get cards to UI
router.delete('/card/:uuid', remove); //delete
router.put('/card/:uuid', update); //update
router.get('/card/:uuid', getCard); // get single card

module.exports = router;

//server.js -> app.js -> routes -> controller (เรียกใช้จาก func create)
