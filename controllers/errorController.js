/* eslint-disable no-console */
const errorCatcher = (err, message, statusCode) => {
  const cause = err ? err.message : 'Can not find the document';
  const error = new Error(message, {
    cause: { message: cause, status: statusCode },
  });
  //error.message and error.cause
  return error;
};

const errorHandler = (err, req, res, next) => {
  const error = {
    error: {
      event: err.message,
      message: err.cause.message,
    },
  };
  return res.status(err.cause.status).json(error);
};

module.exports = { errorHandler, errorCatcher };
