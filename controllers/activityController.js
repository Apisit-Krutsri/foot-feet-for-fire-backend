/* eslint-disable no-console */
// activityController ใช้ติดต่อกับฐานข้อมูล
// const { default: mongoose } = require('mongoose');
const Activities = require('../models/activityModel');
const { errorCatcher } = require('./errorController');
// const Users = require('../models/userModel');

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

//ดึงข้อมูล activity ทั้งหมดของ User คนหนึ่งๆ มา
exports.getAllCards = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Activities.find({ creator: id }).exec((err, card) => {
    //Error catcher
    if (err || card.length === 0) {
      //Error generator
      const error = errorCatcher(err, '❌ Error on get all Activity', 404);
      //error.message and error.cause
      return next(error);
    }
    res.json(card);
  });
};

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

//ลบข้อมูล activity
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

//อัพเดท activity
exports.update = (req, res, next) => {
  const { uuid } = req.params;
  // ส่งข้อมูลมาเพื่อจะได้ทำการ อัพเดท
  const { title, description, sport, date, firstTime, toTime } = req.body;
  Activities.findOneAndUpdate(
    { uuid },
    { title, description, sport, date, firstTime, toTime },
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

////////////////////////////////////////////////////////////////////

// exports.createActivity = async (req, res, next) => {
//   // ดูว่ามี error ในการ validation ที่ตรวจพบตามการตั้งค่าของเราหรือไม่ !!!สำคัญ
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }

//   const { title, date, timeStart, timeEnd, sport, description, creator } =
//     req.body;
//   // const title = req.body.title

//   const createdActivity = new Activity({
//     title,
//     date,
//     timeStart,
//     timeEnd,
//     sport,
//     description,
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
//     creator,
//   });

//   // ตรวจสอบว่ามี user id ใน DB ที่ตรงกับ creator(user id) ที่มากจาก req.body หรือไม่
//   let user;

//   try {
//     user = await User.findById(creator);
//   } catch (err) {
//     const error = new HttpError('Creating place failed, please try again', 500);
//     return next(error);
//   }

//   if (!user) {
//     const error = new HttpError('Could not find user for provided id', 404);
//     return next(error);
//   }

//   // Transactions => ทำให้สามารถดำเนินการหลายรายการโดยแยกจากกัน และอาจเลิกทำการดำเนินการทั้งหมดหากหนึ่งในนั้นล้มเหลว
//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await createdActivity.save({ session: sess });
//     user.activities.push(createdActivity);
//     await user.save({ session: sess });
//     await sess.commitTransaction();
//   } catch (err) {
//     const error = new HttpError(
//       'Creating place failed, please try again.',
//       500
//     );
//     return next(error);
//   }

//   res.status(201).json({
//     card: createdActivity,
//   });
// };
