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
    // const tokenAndId = {token: token, id: user._id}
    res.status(200).send({ data: token, message: 'Logged in successfully' });
    // res.write(user._id);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
