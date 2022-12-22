/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

// //connect cloud database = if connect -> console.log // if don't -> console.log err
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(
    () => console.log('✅ Connected to database'),
    (err) => console.error(err)
  );

// // route
// app.get('*', (req, res) => {
//   res.json({
//     data: 'message from server',
//   });
// });

const port = process.env.PORT;
(async () => {
  try {
    app.listen(port, () => {
      console.log(`✅ App running on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
})();

// API (front-end) -> backend url -> database (mongoDB)
