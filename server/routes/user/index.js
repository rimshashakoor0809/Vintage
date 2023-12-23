const express = require("express");
const upload = require("../../multer");
const { getUser } = require("./user.controller");
const { verifyUser } = require("../../services/protect.service");
const router = express.Router();

router
  .get("/", verifyUser, getUser)

module.exports = router;