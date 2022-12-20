// profileModel
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง
    },
    lastName: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
    },
    quote: {
      type: String,
    },
    selectGoal: {
      type: String,
      //   required: true,
    },
    goal: {
      type: String,
      //   required: true,
    },
    number: {
      type: Number,
      //   required: true,
    },
    image: {
      type: String,
    },
    uuidprofile: {
      type: String,
      lowercase: true,
      unique: true, //ห้ามใส่ค่าซ้ำกัน
    },
    creator: { type: mongoose.Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema); // "Blogs" คือชื่อโมเดล, blogSchema คือชื่อตัวแปรที่จะส่ง
