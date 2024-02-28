// Error Handler
const handleError = (res, statusCode, message) => {
  res.status(statusCode).json({ success: false, error: message });
};

module.exports = {
  handleError,
};
