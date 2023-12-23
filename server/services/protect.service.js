const log = require("../logger");
const { verifyAccessToken } = require("./jwt.service");


class service {
  constructor() {
    this.verifyUser = this.verifyUser.bind(this)
  }

  async verifyUser(req, res, next) {
    const accessToken = req.cookies.user_access_token;
    const refreshToken = req.cookies.user_refresh_token;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User. No token found.",
        data: null
      });
    }

    try {
      const decoded = await verifyAccessToken(accessToken)
      console.log("Decoded User Data:", decoded);
      req.user = decoded;
      return next();
    } catch (err) {
      log.info(err, "Error in verification:")

      return res.status(401).json({
        success: false,
        message: "Invalid token",
        data: null
      });
    }
  }



}

module.exports = new service()
