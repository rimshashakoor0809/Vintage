const Seller = require("../../models/Seller");
const User = require("../../models/User");

class Service {

  constructor() {

  }

  async registerUser(payload) {
    const { name, email, password, fileUrl } = payload;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("user already exists.")
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: fileUrl
    });

    if (!user) {
      throw new Error("Failed to register new user.")
    }

    return user;
  }

  async loginUser(payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found")
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      throw new Error("Please provide correct password.")
    }
    console.log("user:", user);
    return user;
  }

  async registerSeller(payload) {
    const { name, email, password, phoneNumber, address, zipCode, fileUrl } = payload;
    const sellerExists = await Seller.findOne({ email });
    if (sellerExists) {
      throw new Error("user already exists.")
    }
    const seller = await Seller.create({
      name,
      email,
      password,
      zipCode,
      address,
      phoneNumber,
      avatar: fileUrl
    });

    if (!seller) {
      throw new Error("Failed to register new seller.")
    }

    return seller;
  }

  async loginSeller(payload) {
    const { email, password } = payload;
    const seller = await Seller.findOne({ email }).select("+password");
    if (!seller) {
      throw new Error("Seller not found")
    }

    const validPassword = await seller.comparePassword(password);
    if (!validPassword) {
      throw new Error("Please provide correct password.")
    }
    console.log("seller:", seller);
    return seller;
  }
}

module.exports = new Service();