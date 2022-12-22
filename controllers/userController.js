/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-console */
// userController ใช้ติดต่อกับฐานข้อมูล

const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const { errorCatcher } = require('./errorController');

// บันทึกข้อมูล
// validation : no duplicated email
exports.user = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: 'User with given email already exist!' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Users({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    //Error generator
    const error = errorCatcher(err, '❌ Error on creating User', 400);
    //error.message and error.cause
    return next(error);
  }
};

// ดึงข้อมูลของ user มา
exports.getUser = (req, res, next) => {
  const { id } = req.params;
  Users.find({ _id: id }).exec((err, data) => {
    //Error catcher
    if (err || data.length === 0) {
      //Error generator
      const error = errorCatcher(err, '❌ Error on get User information', 404);
      //error.message and error.cause
      return next(error);
    }
    res.json(data);
  });
};

//อัพเดท User
exports.editUser = async (req, res) => {
  const { id } = req.params;
  // ส่งข้อมูลมาเพื่อจะได้ทำการ อัพเดท
  // const { password } = req.body;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  await Users.findOneAndUpdate(
    { _id: id },
    { password: hashPassword },
    { new: true }
  ).exec((err, data) => {
    // // If query was not found document, it returns null
    // // Error catcher
    // if (err || data == null) {
    //   //Error generator
    //   const error = errorCatcher(
    //     err,
    //     '❌ Error on update User information',
    //     404
    //   );
    //   return next(error);
    // }
    // res.json(data);
    res.json({ err: err, data: data });
  });
};
