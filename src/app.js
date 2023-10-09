const { MESSAGES } = require("./utils/constants");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const { authRoutes, userRoutes } = require("./routes");
const port = process.env.APP_PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log(MESSAGES.DATA_BASE_SYNCRONIZED);
    app.listen(port, () => {
      console.log(`${MESSAGES.SERVER_LISTENING}...`);
    });
  })
  .catch((error) => {
    console.error(`${MESSAGES.ERROR_SYNCHRONIZING_DATABASE}`, error);
  });
