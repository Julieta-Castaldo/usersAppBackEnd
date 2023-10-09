const { request, response } = require("express");
const { sendErrorResponse } = require("../handlers/responseHandler");
const { HEADERS, HTTPS_STATUS_CODES, MESSAGES } = require("../utils/constants");
const { verifyJwtToken } = require("../utils/jwt");

const jwtValidation = async (req = request, res = response, next) => {
  try {
    const token = req.header(HEADERS.AUTHORIZATION);
    if (!token) {
      return sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.NOT_AUTHORIZED,
        message: MESSAGES.ERROR_MISSED_TOKEN,
      });
    }

    const user = await verifyJwtToken({ token });
    req.user = user;
    next();
  } catch (error) {
    return sendErrorResponse({
      res,
      statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
      message: MESSAGES.ERROR_VALIDATE_TOKEN,
      error,
    });
  }
};

module.exports = {
  jwtValidation,
};
