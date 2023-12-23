const jwt = require("jsonwebtoken")
const log = require("../logger");

class service {
  constructor() {
    this.verifyAccessToken = this.verifyAccessToken.bind(this);
  }

  async generateAccessToken(payload) {
    return jwt.sign(
      payload,
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: 24 * 60 * 60
      })
  }

  async generateRefreshToken(payload) {
    return jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: 60 * 24 * 60 * 60
    });
  }

  async isTokenExpired(token) {
    if (token && this.verifyAccessToken(token)) {
      const decoded = jwt.decode(token);
      const currentTime = Date.now() / 1000;
      return decoded?.exp > currentTime;
    }
  }


  async verifyAccessToken(token) {
    const decodeToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
    // log.info({ decodeToken }, "decoded jwt")
    return decodeToken
  }

  async verifyRefreshToken(token) {
    const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY)
    // log.info({ decodeToken }, "decoded jwt")

    return decodeToken;
  }

  verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }
}

module.exports = new service()
