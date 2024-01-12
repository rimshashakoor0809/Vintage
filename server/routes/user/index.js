const express = require("express");
const upload = require("../../multer");
const { getUser, updateUserDetails, updateUserAddress, deleteUserAddress } = require("./user.controller");
const { verifyUser } = require("../../services/protect.service");
const router = express.Router();

router
  .get("/", verifyUser, getUser)
router
  .put("/", verifyUser, updateUserDetails)
router
  .put("/address", verifyUser, updateUserAddress)
router
  .delete("/address/:id", verifyUser, deleteUserAddress)

module.exports = router;