// activityModel
const mongoose = require('mongoose');

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง
    },
    description: {
      type: {},
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    firstTime: {
      type: String,
      required: true,
    },
    toTime: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
    },
    image: {
      type: String,
    },
    uuid: {
      type: String,
      lowercase: true,
      unique: true, //ห้ามใส่ค่าซ้ำกัน
    },
    creator: { type: mongoose.Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activities', activitySchema); // "Blogs" คือชื่อโมเดล, blogSchema คือชื่อตัวแปรที่จะส่ง
