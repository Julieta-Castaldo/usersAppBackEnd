const HTTPS_STATUS_CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const TOKEN_EXPIRATION_TIME_IN_HOURS = "1h";

const HEADERS = {
  AUTHORIZATION: `Authorization`,
};

const ERROR_RESPONSE = `Something went wrong when trying to`;

const MESSAGES = {
  DATA_BASE_SYNCRONIZED: "Data base syncronized",
  SERVER_LISTENING: `Server listening`,
  INVALID_PASSWORD: `Invalid password`,
  USER_NOT_FOUND: `User not found`,
  ERROR_CREATE_USER: `${ERROR_RESPONSE} create the user`,
  ERROR_DELETE_USER: `${ERROR_RESPONSE} delete the user`,
  ERROR_UPDATE_USER: `${ERROR_RESPONSE} update the user`,
  ERROR_LIST_USERS: `${ERROR_RESPONSE} list the users`,
  ERROR_GET_USER: `${ERROR_RESPONSE} get the user`,
  ERROR_SIGN_UP: `${ERROR_RESPONSE} sign up`,
  ERROR_LOG_IN: `${ERROR_RESPONSE} log in`,
  ERROR_MISSED_TOKEN: `Missed Token`,
  ERROR_VALIDATE_TOKEN: `${ERROR_RESPONSE} validate token`,
  USER_SUCCESSFULLY_DELETED: `User successfully deleted`,
  EMAIL_EXIST_IN_DATABASE: `The email exist in the database`,
  ERROR_SYNCHRONIZING_DATABASE: `Error synchronizing database`,
};

module.exports = {
  HEADERS,
  HTTPS_STATUS_CODES,
  MESSAGES,
  TOKEN_EXPIRATION_TIME_IN_HOURS,
};
