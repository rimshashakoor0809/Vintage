const express = require("express");
const upload = require("../../multer");
const { getSeller } = require("./seller.controller");
const { verifySeller } = require("../../services/protect.service");
const router = express.Router();

router
  .get("/", verifySeller, getSeller)

module.exports = router;