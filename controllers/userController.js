// userController ใช้ติดต่อกับฐานข้อมูล

const bcrypt = require('bcrypt');
const Users = require('../models/userModel');

// บันทึกข้อมูล
// validation : no duplicated email
exports.user = async (req, res) => {
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
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
