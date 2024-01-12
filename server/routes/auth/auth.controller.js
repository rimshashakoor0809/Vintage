const path = require("path");
const { registerUser, loginUser, registerSeller, loginSeller } = require("./auth.service");
const log = require("../../logger");
const joi = require("joi");
const { generateAccessToken, generateRefreshToken } = require("../../services/jwt.service");
const ErrorHandler = require("../../utils/ErrorHandler");
const sendEmail = require("../../utils/sendEmail");
const User = require("../../models/User");
const Seller = require("../../models/Seller");
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
    const { name, email, password, phoneNumber, zipCode, address } = req.body;
    try {
      await this.validateRegistrationSeller({ name, email, password, phoneNumber });
      const filename = req?.file?.filename;
      const fileUrl = path.join(filename);
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
        address: user.address,
        phoneNumber: user.phoneNumber,
        zipCode: user.zipCode
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
      phoneNumber: joi.string().required(),
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

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      console.log("Email:", email);

      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({
          success: false,
          message: "user not found.",
        })
      }
      // construct reset url/link
      const resetUrl = `${process.env.FRONTEND_URL}reset-password/${user?.id}`;
      console.log("Reset url:", resetUrl)

      // send Email
      const subject = "Vintage Password Reset"
      const to = user.email
      const from = process.env.EMAIL_USER
      const replyTo = "no-reply@vintage.com"
      const template = "forgotPassword"
      const name = user.name
      const link = resetUrl
      const data = { name, link };

      await sendEmail(subject, to, from, replyTo, template, data);
      res.status(200).json({
        success: true,
        message: "Reset password email sent successfully"
      });
    } catch (error) {
      log.error(error, "Error forgetting password:");
      ErrorHandler(res, error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      console.log("token: ", token);
      console.log("password:", password);
      const user = await User.findById(token)
      console.log("User Token in Reset:", user)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No user found.",
          data: null
        })
      }

      user.password = password;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password Reset Successfully. Please login to your account"
      });
    } catch (error) {
      log.error(error, "Error resetting password:");
      ErrorHandler(res, error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = req.user;
      if (!oldPassword && !newPassword) {
        return res.status(404).json({
          success: false,
          message: "Please provide both confirm and new password",
          data: null
        })
      }
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No token found.",
          data: null
        })
      }

      const userDetails = await User.findById(user?.id);
      if (!userDetails) {
        return res.status(404).json({
          success: false,
          message: "No user found.",
          data: null
        })
      }

      // check if current password matches with the existing one.
      const isPasswordCorrect = await bcrypt.compare(payload.oldPassword, userDetails.password);
      if (!isPasswordCorrect) {
        return res.status(404).json({
          success: false,
          message: "old password does not match.",
          data: null
        })
      }
      
      // Reset the password
      userDetails.password = newPassword;
      await userDetails.save()
      this.clearCookiesData(res, "user");

      // send Email

      const subject = "Password Changed Successfully"
      const to = user.email
      const from = process.env.EMAIL_USER
      const replyTo = "no-reply@vintage.com"
      const template = "changePassword"
      const data = { name: req.user.name };

      await sendEmail(subject, to, from, replyTo, template, data);

      res.status(200).json({
        success: true,
        message: "Password changed Successfully. Please login to your account."
      });
    } catch (error) {
      ErrorHandler(res, error);
    }
  }

  async sellerForgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await Seller.findOne({ email });
      if (!user) {
        res.status(400).json({
          success: false,
          message: "seller not found.",
        })
      }
      // construct reset url/link
      const resetUrl = `${process.env.FRONTEND_URL}auth/seller/reset-password/${user?.id}`;
      console.log("Reset url:", resetUrl)

      // send Email
      const subject = "Vintage Password Reset"
      const to = user.email
      const from = process.env.EMAIL_USER
      const replyTo = "no-reply@vintage.com"
      const template = "forgotPassword"
      const name = user.name
      const link = resetUrl
      const data = { name, link };

      await sendEmail(subject, to, from, replyTo, template, data);
      res.status(200).json({
        success: true,
        message: "Reset password email sent successfully"
      });
    } catch (error) {
      log.error(error, "Error forgetting password (seller):");
      ErrorHandler(res, error);
    }
  }

  async sellerResetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const user = await Seller.findById(token)
      console.log("User Token in Reset:", user)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No seller found.",
          data: null
        })
      }

      // Reset the password
      user.password = password;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password Reset Successfully. Please login to your account"
      });
    } catch (error) {
      log.error(error, "Error forgetting password:");
      ErrorHandler(res, error);
    }
  }

  async sellerChangePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = req.seller;
      if (!oldPassword && !newPassword) {
        return res.status(404).json({
          success: false,
          message: "Please provide both confirm and new password",
          data: null
        })
      }
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No token found.",
          data: null
        })
      }

      const userDetails = await Seller.findById(user?.id);
      if (!userDetails) {
        return res.status(404).json({
          success: false,
          message: "No user found.",
          data: null
        })
      }

      // check if current password matches with the existing one.
      const isPasswordCorrect = await bcrypt.compare(payload.oldPassword, userDetails.password);
      if (!isPasswordCorrect) {
        return res.status(404).json({
          success: false,
          message: "old password does not match.",
          data: null
        })
      }

      // Reset the password
      userDetails.password = newPassword;
      await userDetails.save()
      this.clearCookiesData(res, "seller");

      // send Email

      const subject = "Password Changed Successfully"
      const to = user.email
      const from = process.env.EMAIL_USER
      const replyTo = "no-reply@vintage.com"
      const template = "changePassword"
      const data = { name: req.user.name };

      await sendEmail(subject, to, from, replyTo, template, data);

      res.status(200).json({
        success: true,
        message: "Password changed Successfully. Please login to your account."
      });
    } catch (error) {
      ErrorHandler(res, error);
    }
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