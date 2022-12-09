// activityController ใช้ติดต่อกับฐานข้อมูล
// import { v4 as uuidv4 } from 'uuid';
const Activities = require('../models/activityModel');

//บันทึกข้อมูล
// exports.create = (req, res) => {
//   try {
//     const { uuid, firstTime, toTime, date, sport, title, description } =
//       req.body;
//     res.json({
//       data: req.body,
//     });
//   } catch (err) {
//     console.log(err);
//   }

//บันทึกข้อมูล

//  Activities.create(
//     { uuid, firstTime, toTime, date, sport, title, description },
//     (err, activity) => {
//       if (err) {
//         res.status(400).json({ error: 'มีชื่อบทความซ้ำกัน' });
//         return;
//       }
//       res.json(activity);
//     }
//   );
// };

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

//ดึงข้อมูลบทความทั้งหมดมา
exports.getAllCards = (req, res) => {
  Activities.find({}).exec((err, card) => {
    res.json(card);
  });
};

//ลบข้อมูลบทความ
exports.remove = (req, res) => {
  const { uuid } = req.params;
  Activities.findOneAndRemove({ uuid }).exec((err, card) => {
    if (err) console.log(err);
    res.json({
      message: 'ลบบทความเรียบร้อย',
    });
  });
};
