const log = require("../../logger");
const joi = require("joi");
const ErrorHandler = require("../../utils/ErrorHandler");
const { getUserDetails } = require("./user.service");
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

}

module.exports = new Controller();