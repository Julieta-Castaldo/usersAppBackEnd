const { userService } = require("../services");
const { hashPassword } = require("../utils/bcrypt");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../handlers/responseHandler");
const { HTTPS_STATUS_CODES, MESSAGES } = require("../utils/constants");

const userController = {
  createUser: async (req, res) => {
    try {
      const user = req.body;
      const encryptPassword = await hashPassword({
        password: user.password,
      });
      user.password = encryptPassword;
      const userCreated = await userService.createUser({ user });
      sendSuccessResponse({ res, data: { user: userCreated } });
    } catch (error) {
      sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
        message: MESSAGES.ERROR_CREATE_USER,
        error,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      sendSuccessResponse({ res, data: { users } });
    } catch (error) {
      sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
        message: MESSAGES.ERROR_LIST_USERS,
        error,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById({ id });
      if (!user)
        return sendErrorResponse({
          res,
          statusCode: HTTPS_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
        });
      sendSuccessResponse({ res, data: { user } });
    } catch (error) {
      sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
        message: MESSAGES.ERROR_GET_USER,
        error,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUserData = req.body;
      const user = await userService.getUserById({ id });
      if (!user)
        return sendErrorResponse({
          res,
          statusCode: HTTPS_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
        });
      const userUpdated = await userService.updateUser({
        id,
        user: updatedUserData,
      });
      sendSuccessResponse({ res, data: { user: updatedUserData } });
    } catch (error) {
      sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
        message: MESSAGES.ERROR_UPDATE_USER,
        error,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById({ id });
      if (!user)
        return sendErrorResponse({
          res,
          statusCode: HTTPS_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
        });
      const userDeleted = await userService.deleteUser({ id });
      if (!userDeleted)
        return sendErrorResponse({
          res,
          statusCode: HTTPS_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
        });
      sendSuccessResponse({
        res,
        data: { message: MESSAGES.USER_SUCCESSFULLY_DELETED },
      });
    } catch (error) {
      sendErrorResponse({
        res,
        statusCode: HTTPS_STATUS_CODES.SERVER_ERROR,
        message: MESSAGES.ERROR_DELETE_USER,
        error,
      });
    }
  },
};

module.exports = userController;
