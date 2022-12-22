// activityController ใช้ติดต่อกับฐานข้อมูล
// const { default: mongoose } = require('mongoose');
const Activities = require('../models/activityModel');
const { errorCatcher } = require('./errorController');
// const Users = require('../models/userModel');

// // บันทึกข้อมูล
// exports.create = async (req, res) => {
//   try {
//     const newCard = await Activities.create(req.body);
//     // let user = await Users.findById(req.body.creator);
//     res.status(201).json({
//       data: { card: newCard },
//     });
//     // console.log(req.body.creator)
//   } catch (err) {
//     res.status(400).json({ message: console.log(err) });
//   }
// };

// บันทึกข้อมูล 
exports.create = async (req, res, next) => {
  try {
    const newCard = await Activities.create(req.body);
    // let user = await Users.findById(req.body.creator);
    res.status(201).json({
      data: { card: newCard },
    });
    // console.log(req.body.creator)
  } catch (err) {
    //Error generator
    const error = errorCatcher(err, '❌ Error on creating activity', 400);
    //error.message and error.cause
    return next(error);
  }
};

// //ดึงข้อมูล activity ทั้งหมดของ User คนหนึ่งๆ มา
// exports.getAllCards = (req, res) => {
//   const { id } = req.params;
//   Activities.find({ creator: id }).exec((err, card) => {
//     res.json(card);
//   });
// };

//ดึงข้อมูล activity ทั้งหมดของ User คนหนึ่งๆ มา
exports.getAllCards = (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  Activities.find({ creator: id }).exec((err, card) => {
    //Error catcher
    if (err) {
      //Error generator
      const error = errorCatcher(err, '❌ Error on get all Activity', 404);
      //error.message and error.cause
      return next(error);
    }
    res.json(card);
  });
};

// //ดึงข้อมูล activity ของ card ที่มี uuid ที่สนใจ
// exports.getCard = (req, res) => {
//   const { uuid } = req.params;
//   Activities.find({ uuid }).exec((err, card) => {
//     res.json(card);
//   });
// };

//ดึงข้อมูล activity ของ card ที่มี uuid ที่สนใจ
exports.getCard = (req, res, next) => {
  const { uuid } = req.params;
  Activities.find({ uuid }).exec((err, card) => {
    //Error catcher
    if (err || card.length === 0) {
      //Error generator
      const error = errorCatcher(err, '❌ Error on get an Activity', 404);
      return next(error);
    }
    res.json(card);
  });
};

// //ลบข้อมูล activity
// exports.remove = (req, res) => {
//   const { uuid } = req.params;
//   Activities.findOneAndRemove({ uuid }).exec((err, card) => {
//     if (err) console.log(err);
//     res.json({
//       message: 'Your activity was deleted',
//     });
//   });
// };

exports.remove = (req, res, next) => {
  const { uuid } = req.params;
  Activities.findOneAndRemove({ uuid }).exec((err, card) => {
    //If query was not found document, it returns null
    //Error catcher
    if (err || card == null) {
      //Error generator
      const error = errorCatcher(err, '❌ Error on remove an Activity', 404);
      return next(error);
    }
    res.json(`Your ${card.uuid} card has already removed`);
  });
};

// //อัพเดท activity
// exports.update = (req, res) => {
//   const { uuid } = req.params;
//   // ส่งข้อมูลมาเพื่อจะได้ทำการ อัพเดท
//   const { title, description, sport, date, firstTime, toTime, image } =
//     req.body;
//   Activities.findOneAndUpdate(
//     { uuid },
//     { title, description, sport, date, firstTime, toTime, image },
//     { new: true }
//   ).exec((err, card) => {
//     if (err) console.log(err);
//     res.json(card);
//   });
// };

//อัพเดท activity
exports.update = (req, res, next) => {
  const { uuid } = req.params;
  // ส่งข้อมูลมาเพื่อจะได้ทำการ อัพเดท
  const { title, description, sport, date, firstTime, toTime, image } = req.body;
  Activities.findOneAndUpdate(
    { uuid },
    { title, description, sport, date, firstTime, toTime, image },
    { new: true }
  ).exec((err, card) => {
    //If query was not found document, it returns null
    //Error catcher
    if (err || card == null) {
      //Error generator
      const error = errorCatcher(err, '❌ Error on update an Activity', 404);
      return next(error);
    }
    res.json(card);
  });
};