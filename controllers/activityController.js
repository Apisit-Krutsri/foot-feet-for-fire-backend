// activityController ใช้ติดต่อกับฐานข้อมูล
const Activities = require('../models/activityModel');

// บันทึกข้อมูล
exports.create = async (req, res) => {
  try {
    const newCard = await Activities.create(req.body);
    res.status(201).json({
      data: { card: newCard },
    });
  } catch (err) {
    res.status(400).json({ message: console.log(err) });
  }
};

//ดึงข้อมูล activity ทั้งหมดมา
exports.getAllCards = (req, res) => {
  Activities.find({}).exec((err, card) => {
    res.json(card);
  });
};

//ดึงข้อมูล activity ของ card ที่มี uuid ที่สนใจ
exports.getCard = (req, res) => {
  const {uuid} = req.params
  Activities.find({uuid}).exec((err, card) => {
    res.json(card);
  });
};

//ลบข้อมูล activity
exports.remove = (req, res) => {
  const { uuid } = req.params;
  Activities.findOneAndRemove({ uuid }).exec((err, card) => {
    if (err) console.log(err);
    res.json({
      message: 'Your activity was deleted',
    });
  });
};

//อัพเดท activity
exports.update = (req, res) => {
  const { uuid } = req.params; //รับ slug url มา
  // ส่งข้อมูล title, content, author มาเพื่อจะได้ทำการ อัพเดท
  const { title, description, sport, date, firstTime, toTime } = req.body;
  Activities.findOneAndUpdate(
    { uuid },
    { title, description, sport, date, firstTime, toTime },
    { new: true }
  ).exec((err, card) => {
    if (err) console.log(err);
    res.json(card);
  });
};
