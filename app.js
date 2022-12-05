const express = require('express');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 🙌');
  return next();
});

// 3) ROUTES

module.exports = app;
