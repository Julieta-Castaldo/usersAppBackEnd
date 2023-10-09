const { userService } = require("../services");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../handlers/responseHandler");
const { generateJwtToken } = require("../utils/jwt");
const { hashPassword, passwordMatch } = require("../utils/bcrypt");
const { HTTPS_STATUS_CODES, MESSAGES } = require("../utils/constants");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userService.getUserByEmail({ email });
      if (!user)
        return sendErrorResponse({
          res,
          statusCode: HTTPS_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
        });
      const isCorrectPassword = await passwordMatch({
        password,
        userPasswordFromDb: user.password,
      });

      if (!isCorrectPassword)
        return sendErrorResponse({
          res,
          statusCode: HTTPS_STATUS_CODES.NOT_AUTHORIZED,
          message: MESSAGES.INVALID_PASSWORD,
        });
      const token = await generateJwtToken({ user: user.dataValues });
      const { password: userPassword, ...userToReturn } = user.dataValues;
      sendSuccessResponse({ res, data: { token, user: userToReturn } });
    } catch (error) {
      sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
        message: MESSAGES.ERROR_LOG_IN,
        error,
      });
    }
  },

  signUp: async (req, res) => {
    const user = req.body;
    const { email } = user;
    try {
      const existUser = await userService.getUserByEmail({ email });
      if (existUser) {
        return sendErrorResponse({
          res,
          statusCode: HTTPS_STATUS_CODES.CONFLICT,
          message: MESSAGES.EMAIL_EXIST_IN_DATABASE,
        });
      }
      const encryptPassword = await hashPassword({ password: user.password });
      user.password = encryptPassword;
      const userCreated = await userService.createUser({ user });
      const { password, ...userToReturn } = userCreated.dataValues;
      sendSuccessResponse({ res, data: { user: userToReturn } });
    } catch (error) {
      sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
        message: MESSAGES.ERROR_SIGN_UP,
        error,
      });
    }
  },
};

module.exports = authController;
