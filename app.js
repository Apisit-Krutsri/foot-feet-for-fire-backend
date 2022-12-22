const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const activityRoute = require('./routes/activityRoutes');
const profileRoute = require('./routes/profileRoutes');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const imageRoute = require('./routes/cloudinaryRoute');
const { errorHandler } = require('./controllers/errorController');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req,res,next) => {
res.send('I love kungkeng')
})

// 2) ROUTES
app.use('/api', activityRoute);
app.use('/api', profileRoute);
app.use('/api', userRoute);
app.use('/api', authRoute);
app.use('/api', imageRoute);

//3) Global error handler
app.use(errorHandler);

module.exports = app;

// server = ใช้ใน node.js start เอาไว้เก็บไฟล์เวลาเข้าครั้งแรก
// app.js = ตัวแจกจ่ายเพื่อส่งไป route

//app.use มาใช้ตรงนี้ เพราะทุกอันผ่านอันนี้
