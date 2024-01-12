const express = require("express");
const upload = require("../../multer");
const { registerUser, loginUser, registerSeller, loginSeller, forgotPassword, resetPassword, changePassword, sellerForgotPassword, sellerResetPassword, sellerChangePassword } = require("./auth.controller");
const { verifyUser, verifySeller } = require("../../services/protect.service");
const router = express.Router();

router
  .post("/user/register", upload.single("file"), registerUser)

router
  .post("/user/login", loginUser)

router
  .post("/user/forgot-password", forgotPassword)

router
  .post("/user/reset-password/:token", resetPassword);

router
  .post("/user/change-password", verifyUser, changePassword);

router
  .post("/seller/register", upload.single("file"), registerSeller)

router
  .post("/seller/login", loginSeller)
router
  .post("/seller/forgot-password", sellerForgotPassword)

router
  .post("/seller/reset-password/:token", sellerResetPassword);

router
  .post("/seller/change-password", verifySeller, sellerChangePassword);

module.exports = router;