const User = require("../models/userModel");

const userService = {
  createUser: async ({ user }) => {
    return await User.create(user, {
      returning: true,
      attributes: [
        "id",
        "email",
        "firstName",
        "lastName",
        "country",
        "createdAt",
      ],
    });
  },

  getAllUsers: async () => {
    return await User.findAll({
      attributes: ["id", "email", "firstName", "lastName", "country"],
    });
  },

  getUserById: async ({ id }) => {
    return await User.findByPk(id, {
      attributes: ["id", "email", "firstName", "lastName", "country"],
    });
  },

  getUserByEmail: async ({ email }) => {
    return await User.findOne({
      where: {
        email,
      },
    });
  },

  updateUser: async ({ id, user }) => {
    return await User.update(user, {
      where: {
        id,
      },
      returning: true,
      attributes: { exclude: ["password"] },
    });
  },
  deleteUser: async ({ id }) => {
    return await User.destroy({
      where: {
        id,
      },
    });
  },
};

module.exports = userService;
