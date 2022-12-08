// activityModel
const mongoose = require('mongoose');

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, //ห้ามใส่ค่าว่าง
    },
    description: {
      type: {},
      required: true,
    },
    firstTime: {
      type: String,
      lowercase: true,
      required: true, //ห้ามใส่ค่าซ้ำกัน
    },
    toTime: {
      type: String,
      lowercase: true,
      required: true, //ห้ามใส่ค่าซ้ำกัน
    },
    sport: {
      type: String,
    },
    uuid: {
      type: String,
      lowercase: true,
      unique: true, //ห้ามใส่ค่าซ้ำกัน
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activities', activitySchema); // "Blogs" คือชื่อโมเดล, blogSchema คือชื่อตัวแปรที่จะส่ง
