
const sendError = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
      error: {
        status: statusCode,
        message: message,
        data: data
      }
    });
  };
  
  module.exports = sendError;
  