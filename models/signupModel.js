// // activityModel
// const mongoose = require('mongoose');

// const SignupSchema = mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true, // ห้ามใส่ค่าว่าง
//     },
//     password: {
//       type: String,
//       required: true, // ห้ามใส่ค่าว่าง
//     },
//     // uuid: {
//     //   type: String,
//     //   lowercase: true,
//     //   unique: true, //ห้ามใส่ค่าซ้ำกัน
//     // },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Signup', SignupSchema); // "Blogs" คือชื่อโมเดล, blogSchema คือชื่อตัวแปรที่จะส่ง
