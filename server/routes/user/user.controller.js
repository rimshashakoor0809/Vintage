const log = require("../../logger");
const joi = require("joi");
const ErrorHandler = require("../../utils/ErrorHandler");
const { getUserDetails } = require("./user.service");
const User = require("../../models/User");
class Controller {

  constructor() {
  }

  async getUser(req, res, next) {
    try {
      const id = req.user.id;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized user. Please login again.",
          data: null

        })
      }
      const user = await getUserDetails(id);
      return res.status(200).json({
        success: true,
        data: user

      })

    } catch (error) {
      log.error(error, "Error in fetching user details: ")
      ErrorHandler(res, error)
    }
  }
  async updateUserDetails(req, res, next) {
    try {
      const id = req.user.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized user. Please login again.",
          data: null

        })
      }
      const user = await User.findById(req.user.id);
      user = {
        name: req.body.name || user.name,
        phoneNumber: req.body.phoneNumber || user.phoneNumber,
      };
      await user.save();
      return res.status(200).json({
        success: true,
        data: user

      })

    } catch (error) {
      log.error(error, "Error in updating user details: ")
      ErrorHandler(res, error)
    }
  }

  async updateUserAddress(req, res, next){
    try {
      const user = await User.findById(req.user.id);
      console.log("Address User:", user);
      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      console.log("Existing Address:", existsAddress)
      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        user.addresses.push(req.body);
      }
      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      log.error(error, "Error in updating user address: ")
      ErrorHandler(res, error)
    }
  }
  async deleteUserAddress(req, res, next){
    try {
      const userId = req.user.id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      log.error(error, "Error in deleting user address: ")
      ErrorHandler(res, error)
    }
  }

}

module.exports = new Controller();