const path = require("path");
const { registerUser, loginUser, registerSeller, loginSeller } = require("./auth.service");
const log = require("../../logger");
const joi = require("joi");
const { generateAccessToken, generateRefreshToken } = require("../../services/jwt.service");
const ErrorHandler = require("../../utils/ErrorHandler");
class Controller {

  constructor() {
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this)
    this.registerSeller = this.registerSeller.bind(this);
    this.loginSeller = this.loginSeller.bind(this)
  }

  async registerUser(req, res, next) {
    const { name, email, password } = req.body;
    try {
      await this.validateRegistrationUser({ name, email, password });
      const filename = req?.file?.filename;
      console.log("Filename:", filename);
      const fileUrl = path.join(filename);
      const payload = { ...req.body, fileUrl };
      log.info(req.body, "Register Payload");
      const user = await registerUser(payload);

      res.status(200).json({
        success: true,
        message: "Account has been registered successfully.",
        data: user

      })
    } catch (error) {
      log.error(error, "Registration Error: ")
      ErrorHandler(res, error)
    }
  }

  async loginUser(req, res, next) {
    try {
      await this.validateLogin(req.body);
      const user = await loginUser(req.body);

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        address: user.addresses,
        phoneNumber: user.phoneNumber
      }
      console.log("Login User:", payload);

      const accessToken = await generateAccessToken(payload)
      const refreshToken = await generateRefreshToken(payload);

      this.setCookies(res, "user", accessToken, refreshToken)

      res.status(200).json({
        success: true,
        message: "login successfully.",
        data: payload

      })
    } catch (error) {
      log.error(error, "Login Error: ")
      ErrorHandler(res, error)

    }
  }

  async registerSeller(req, res, next) {
    const { name, email, password } = req.body;
    try {
      await this.validateRegistrationSeller({ name, email, password });
      const filename = req?.file?.filename;
      console.log("Filename:", filename);
      const fileUrl = path.join(filename);
      console.log("FileUrl:", fileUrl);
      const payload = { ...req.body, fileUrl };
      log.info(req.body, "Register Payload");
      const user = await registerSeller(payload);

      res.status(200).json({
        success: true,
        message: "Account has been registered successfully.",
        data: user

      })
    } catch (error) {
      log.error(error, "Registration Error: ")
      ErrorHandler(res, error)
    }
  }

  async loginSeller(req, res, next) {
    try {
      await this.validateLogin(req.body);
      const user = await loginSeller(req.body);

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        address: user.addresses,
        phoneNumber: user.phoneNumber
      }
      console.log("Login User:", payload);

      const accessToken = await generateAccessToken(payload)
      const refreshToken = await generateRefreshToken(payload);

      this.setCookies(res, "seller", accessToken, refreshToken)

      res.status(200).json({
        success: true,
        message: "login successfully.",
        data: payload

      })
    } catch (error) {
      log.error(error, "Login Error: ")
      ErrorHandler(res, error)

    }
  }

  async validateRegistrationUser(data) {
    const schema = joi.object().keys({
      name: joi.string().required(),
      email: joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: joi.string().required(),
    })
    await schema.validateAsync(data);
  }
  async validateRegistrationSeller(data) {
    const schema = joi.object().keys({
      name: joi.string().required(),
      email: joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: joi.string().required(),
    })
    await schema.validateAsync(data);
  }


  async validateLogin(data) {
    const schema = joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required()
    });

    await schema.validateAsync(data);
  }

  setCookies(res, role, accessToken, refreshToken) {
    res.cookie(`${role}_access_token`, accessToken, {
      httpOnly: true,
      secure: true
    });

    res.cookie(`${role}_refresh_token`, refreshToken, {
      httpOnly: true,
      secure: true
    });
  }

  clearCookies(res, role) {
    res.clearCookie(`${role}_access_token`, "",
      {
        httpOnly: true,
        secure: false

      })
    res.clearCookie(`${role}_access_token`, "",
      {
        httpOnly: true,
        secure: false
      })
  }

}

module.exports = new Controller();