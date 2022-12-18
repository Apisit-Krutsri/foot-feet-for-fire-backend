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
  const { id } = req.params;
  Profile.find({ creator: id }).exec((err, data) => {
    res.json(data);
  });
};

//อัพเดท profile
exports.editProfile = (req, res) => {
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
    { id },
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
    if (err) console.log(err);
    res.json(data);
  });
};
