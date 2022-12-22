/* eslint-disable no-console */
const Profile = require('../models/profileModel');
const { errorCatcher } = require('./errorController');

// บันทึกข้อมูล
exports.profile = async (req, res, next) => {
  try {
    const newProfile = await Profile.create(req.body);
    res.status(201).json({
      data: { profile: newProfile },
    });
  } catch (err) {
    //Error generator
    const error = errorCatcher(err, '❌ Error on creating Profile', 400);
    //error.message and error.cause
    return next(error);
  }
};

//ดึงข้อมูล profile มา
exports.information = (req, res, next) => {
  const { id } = req.params;
  Profile.find({ creator: id }).exec((err, data) => {
    //Error catcher
    if (err || data.length === 0) {
      //Error generator
      const error = errorCatcher(
        err,
        '❌ Error on get Profile information',
        404
      );
      //error.message and error.cause
      return next(error);
    }
    res.json(data);
  });
};

//อัพเดท profile
exports.editProfile = (req, res, next) => {
  const { id } = req.params;
  // ส่งข้อมูลมาเพื่อจะได้ทำการ อัพเดท
  const {
    firstName,
    lastName,
    weight,
    height,
    gender,
    birthday,
    quote,
    goal,
    selectGoal,
    number,
  } = req.body;
  Profile.findOneAndUpdate(
    { creator: id },
    {
      firstName,
      lastName,
      weight,
      height,
      gender,
      birthday,
      quote,
      goal,
      selectGoal,
      number,
    },
    { new: true }
  ).exec((err, data) => {
    //If query was not found document, it returns null
    //Error catcher
    if (err || data == null) {
      //Error generator
      const error = errorCatcher(err, '❌ Error on editing Profile', 404);
      return next(error);
    }
    res.json(data);
  });
};
