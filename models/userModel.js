// userModel
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // ห้ามใส่ค่าว่าง
    },
    password: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง
    },
    // uuid: {
    //   type: String,
    //   lowercase: true,
    //   unique: true, //ห้ามใส่ค่าซ้ำกัน
    // },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '10d',
  });
  return token;
};

module.exports = mongoose.model('Users', userSchema); // "Blogs" คือชื่อโมเดล, blogSchema คือชื่อตัวแปรที่จะส่ง
