const { validationResult } = require("express-validator");
const { HTTPS_STATUS_CODES } = require("../utils/constants");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTPS_STATUS_CODES.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  next();
};

module.exports = handleValidationErrors;
