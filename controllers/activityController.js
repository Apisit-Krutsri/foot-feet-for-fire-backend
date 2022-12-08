// activityController ใช้ติดต่อกับฐานข้อมูล
// import { v4 as uuidv4 } from 'uuid';
const Activities = require("../models/activityModel")

//บันทึกข้อมูล
exports.create = (req, res) => {
  const { uuid, firstTime, toTime, sport, title, description } = req.body;
  res.json({
    data: req.body,
  });

  //บันทึกข้อมูล
  Activities.create(
    { uuid, firstTime, toTime, sport, title, description },
    (err, activity) => {
      if (err) {
        res.status(400).json({ error: 'มีชื่อบทความซ้ำกัน' });
      }
      res.json(activity);
    }
  );
};
