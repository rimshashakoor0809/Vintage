const express = require("express");
const upload = require("../../multer");
const { registerUser, loginUser, registerSeller, loginSeller } = require("./auth.controller");
const router = express.Router();

router
  .post("/user/register", upload.single("file"), registerUser)

router
  .post("/user/login", loginUser)

router
  .post("/seller/register", upload.single("file"), registerSeller)

router
  .post("/seller/login", loginSeller)

module.exports = router;