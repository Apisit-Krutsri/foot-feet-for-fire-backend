const Profile = require('../models/profileModel');

// บันทึกข้อมูล
exports.profile = async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body);
    res.status(201).json({
      data: { profile: newProfile },
    });
  } catch (err) {
    res.status(400).json({ message: console.log(err) });
  }
};

//ดึงข้อมูล profile มา
exports.information = (req, res) => {
  Profile.find({}).exec((err, data) => {
    res.json(data);
  });
};
