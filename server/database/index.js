const mongoose = require("mongoose");
const log = require("../logger");
const mongoURL = process.env.DB_URL;

const db = mongoose.connect(mongoURL)
  .then(data => log.info(`Database connected successfully on server: ${data.connection.host}`))
  .catch(error => log.error(error, "Failed to connect to database"))

module.exports = db;