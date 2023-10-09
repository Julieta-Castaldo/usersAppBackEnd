const { HTTPS_STATUS_CODES } = require("../utils/constants");

const sendSuccessResponse = ({ res, data }) => {
  res.status(HTTPS_STATUS_CODES.SUCCESS).json(data);
};

const sendErrorResponse = ({ res, statusCode, message, error }) => {
  if (error) console.error(error);
  res.status(statusCode).json({ error: message });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
