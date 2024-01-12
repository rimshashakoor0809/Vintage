const log = require("../../logger");
const joi = require("joi");
const ErrorHandler = require("../../utils/ErrorHandler");
const { getSellerDetails } = require("./seller.service");
class Controller {

  constructor() {
  }

  async getSeller(req, res, next) {
    try {
      const id = req.seller.id;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized Seller. Please login again.",
          data: null

        })
      }
      const user = await getSellerDetails(id);
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