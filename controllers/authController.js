const bcrypt = require('bcrypt');
const Users = require('../models/userModel');

// validate email and password (comparing to the database)
exports.auth = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
